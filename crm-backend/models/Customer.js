import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    company: String,
    status: {
        type: String,
        enum: ['Lead', 'Customer', 'Prospect'],
        default: 'Lead'
    }
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;