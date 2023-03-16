import Mongoose from 'mongoose';

const CustomerSchema = new Mongoose.Schema({
    profileId: String,
    businessName: String,
    businessAddress: String,
    creditLimit: Number,
    activeStatus: Boolean,
    emailId: String,
    phoneNumber: String,
    remarks: String
});

export default CustomerSchema;