import './instrumentation/tracing.js';

import { CustomerServiceHost } from './hosting/index.js';

const DEFAULT_PORT = 9090;

class Index {
    static async main() {
        try {
            const portNumber = process.env.SERVICE_PORT || DEFAULT_PORT;
            const customerServiceHost = new CustomerServiceHost(portNumber);

            await customerServiceHost.startServer();

            console.log("Customer Service Started Successfully!");

            const stopServer = async () => {
                await customerServiceHost.stopServer();

                console.log("Customer Service Stopped Successfully!");
            };

            process.on('exit', stopServer);
            process.on('SIGINT', stopServer);
        } catch (error) {
            console.log(`Error Occurred, Details : ${error}`);
        }
    }
}

Index.main();