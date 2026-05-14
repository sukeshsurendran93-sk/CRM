import Customer from "../models/Customer.js";

const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.status(200).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

const createCustomer = async (req, res) => {
    try {
        const { name, email, phone, company, status } = req.body;

        if (!name || !email || !phone || !status) {
            return res.status(400).json({ success: false, message: "Please fill all the required fields" });
        }

        const customer = await Customer.create({
            name,
            email,
            phone,
            company,
            status
        });

        res.status(201).json({
            success: true,
            customer,
            message: "Customer created successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { name, email, phone, company, status } = req.body;

        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        customer.name = name !== undefined ? name : customer.name;
        customer.email = email !== undefined ? email : customer.email;
        customer.phone = phone !== undefined ? phone : customer.phone;
        customer.company = company !== undefined ? company : customer.company;
        customer.status = status !== undefined ? status : customer.status;

        await customer.save();

        res.status(200).json({
            success: true,
            customer,
            message: "Customer updated successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

export {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
};
