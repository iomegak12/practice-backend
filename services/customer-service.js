import { CustomerModel } from '../models/index.js';
import { ConnectionStringBuilder } from '../configs/index.js';
import mongoose from 'mongoose';

const MONGOOSE_OPTIONS = {
    useNewUrlParser: true
};

class CustomerService {
    constructor() {
        this.connectionString = ConnectionStringBuilder.getConnectionString();
    }

    async getCustomers() {
        try {
            await mongoose.connect(this.connectionString, MONGOOSE_OPTIONS);

            const customers = await CustomerModel.find({});

            return customers;
        } catch (error) { throw error; }
        finally {
            await mongoose.disconnect();
        }
    }

    async getCustomerDetail(customerId) {
        try {
            await mongoose.connect(this.connectionString, MONGOOSE_OPTIONS);

            const customerDetail = await CustomerModel.findOne({
                profileId: customerId
            });

            return customerDetail;
        } catch (error) { throw error; }
        finally {
            await mongoose.disconnect();
        }
    }

    async saveCustomerDetail(customerDetail) {
        try {
            await mongoose.connect(this.connectionString, MONGOOSE_OPTIONS);

            const validation = customerDetail && customerDetail.profileId &&
                customerDetail.businessName;

            if (validation) {
                const customerModel = new CustomerModel({
                    profileId: customerDetail.profileId,
                    businessName: customerDetail.businessName,
                    businessAddress: customerDetail.businessAddress,
                    creditLimit: customerDetail.creditLimit,
                    activeStatus: customerDetail.activeStatus,
                    emailId: customerDetail.emailId,
                    phoneNumber: customerDetail.phoneNumber,
                    remarks: customerDetail.remarks
                });

                const addedRecord = await customerModel.save();

                return addedRecord;
            }
        } catch (error) { throw error; }
        finally {
            await mongoose.disconnect();
        }
    }
}

export default CustomerService;
