const { Op } = require('sequelize');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Admin dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const totalProducts = await Product.count();
        const totalOrders = await Order.count();
        const totalCustomers = await User.count({ where: { role: 'customer' } });
        const recentOrders = await Order.findAll({
            limit: 5,
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({
            stats: {
                totalProducts,
                totalOrders,
                totalCustomers
            },
            recentOrders
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats', error });
    }
};

// Get all orders for admin
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [User]
        });
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    const { order_id, status } = req.body;
    
    try {
        const order = await Order.findByPk(order_id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();
        
        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error });
    }
};