import express from "express";
import { CustomerService } from '../services/index.js';

const OK = 200;
const SERVER_ERROR = 500;
const SERVER_ERROR_MESSAGE = "Internal Server Error Occurred!";
const BAD_REQUEST = 400;
const BAD_REQUEST_MESSAGE = "Unable to parse / process current message!";
const NEW_CUSTOMER_EVENT = "NewCustomerRecord";

class CustomerRouter {
    constructor(socketIOServer) {
        this.socketIOServer = socketIOServer;
        this.router = express.Router();
        this.customerService = new CustomerService();

        this.initializeRouting();
    }

    initializeRouting() {
        this.router.get('/', async (request, response) => {
            try {
                const customers = await this.customerService.getCustomers();

                response
                    .status(OK)
                    .send(customers);
            } catch (error) {
                response
                    .status(SERVER_ERROR)
                    .send(`${SERVER_ERROR_MESSAGE}, Details: ${error}`);
            }
        });

        this.router.get('/details/:profileId', async (request, response) => {
            try {
                const profileId = request.params.profileId;
                const customerDetail = await this.customerService.getCustomerDetail(profileId);

                response
                    .status(OK)
                    .send(customerDetail);
            } catch (error) {
                response
                    .status(SERVER_ERROR)
                    .send(`${SERVER_ERROR_MESSAGE}, Details: ${error}`);
            }
        });

        this.router.post('/', async (request, response) => {
            try {
                const body = request.body;
                const addedRecord = await this.customerService.saveCustomerDetail(body);

                if (addedRecord) {
                    if (this.socketIOServer) {
                        this.socketIOServer.emit(NEW_CUSTOMER_EVENT, addedRecord);
                    }

                    response
                        .status(OK)
                        .send(addedRecord);
                } else {
                    response
                        .status(BAD_REQUEST)
                        .send(BAD_REQUEST_MESSAGE);
                }
            } catch (error) {
                response
                    .status(SERVER_ERROR)
                    .send(`${SERVER_ERROR_MESSAGE}, Details: ${error}`);
            }
        });
    }

    get Router() {
        return this.router;
    }
}

export default CustomerRouter;
