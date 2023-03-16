import mongoose from "mongoose"
import CustomerSchema from "./customer-schema.js";

const CustomerModel = mongoose.model("enterprise-customers", CustomerSchema);

export default CustomerModel;
