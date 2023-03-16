const MONGO_HOST = "localhost";
const MONGO_PORT = 27017;
const MONGO_DB = "customersdb";

class ConnectionStringBuilder {
    static getConnectionString() {
        let connectionString = process.env.CONNECTION_STRING;

        if (connectionString) {
            return connectionString;
        }

        const mongoHost = process.env.MONGO_HOST || MONGO_HOST;
        const mongoPort = process.env.MONGO_PORT || MONGO_PORT;
        const mongoDb = process.env.MONGO_DB || MONGO_DB;

        connectionString = `mongodb://${mongoHost}:${mongoPort}/${mongoDb}`;

        return connectionString;
    }
}

export default ConnectionStringBuilder;