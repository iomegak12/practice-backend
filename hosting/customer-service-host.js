import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import { CustomerRouter } from '../routing/index.js';
import UserProfileRouting from "../routing/user-profile-routing.js";
import bodyParser from "body-parser";
import { SSLDetails } from '../configs/index.js';
import fs from "fs";
import morgan from "morgan";
import expressJwt, { expressjwt } from 'express-jwt';

const INVALID_PORT = "Invalid Port Number Specified!";
const CUSTOMER_SERVICE_URL = '/api/customers/v1';
const AUTHENTICATION_URL = '/security';
const WEB_CONTENTS = 'web-content';

class CustomerServiceHost {
    constructor(portNumber) {
        if (!portNumber) {
            throw new Error(INVALID_PORT);
        }

        const sslDetails = SSLDetails.getConfiguration();

        this.portNumber = portNumber;
        this.app = express();
        this.httpServer = http.createServer({
            key: sslDetails.PRIVATE_KEY_FILE,
            cert: sslDetails.CERTIFICATE_FILE,
            passphrase: sslDetails.PRIVATE_KEY_PASSPHRASE
        }, this.app);
        this.socketIOServer = new Server(this.httpServer);
        this.customerRouter = new CustomerRouter(this.socketIOServer);
        this.userProfileRouter = new UserProfileRouting();

        this.initializeMiddleware();
    }

    initializeMiddleware() {
        const SECRET_KEY = 'Prestige123$$/?';

        this.app.use(morgan('combined'));
        this.app.use(this.applyCors);
        this.app.use((error, request, response, next) => {
            if (error && error.constructor.name === 'UnauthorizedError') {
                response.status(401);

                return;
            }

            next();
        });
        this.app.use(bodyParser.json());
        this.app.use(CUSTOMER_SERVICE_URL, expressjwt({
            secret: SECRET_KEY,
            algorithms: ['HS256']
        }));
        this.app.use(AUTHENTICATION_URL, this.userProfileRouter.Router);
        this.app.use(CUSTOMER_SERVICE_URL, this.customerRouter.Router);
        this.app.use(express.static(WEB_CONTENTS));
    }

    applyCors(request, response, next) {
        response.header('Access-Control-Allow-Credentials', 'true');
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        next();
    }

    startServer() {
        const promise = new Promise(
            (resolve, reject) => {
                this.httpServer.listen(this.portNumber, () => {
                    resolve();
                });
            });

        return promise;
    }

    stopServer() {
        const promise = new Promise(
            (resolve, reject) => {
                this.httpServer.close(() => {
                    resolve();
                });
            });

        return promise;
    }
}

export default CustomerServiceHost;
