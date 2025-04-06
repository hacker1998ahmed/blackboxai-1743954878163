const User = require('../models/User');

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await User.findAll({
            where: { role: 'customer' },
            include: ['orders'] // Include customer orders
        });
        res.status(200).json({ customers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error });
    }
};

// Update customer information
exports.updateCustomer = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const customer = await User.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        await customer.update(updates);
        res.status(200).json({ message: 'Customer updated successfully', customer });
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error });
    }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await User.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        await customer.destroy();
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error });
    }
};

// Get customer orders
exports.getCustomerOrders = async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await User.findByPk(id, {
            include: ['orders']
        });
        
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ orders: customer.orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customer orders', error });
    }
};
