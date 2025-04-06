const { Op } = require('sequelize');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create new order
exports.createOrder = async (req, res) => {
    const { payment_method, shipping_address, contact_number } = req.body;
    const user_id = req.user.id;

    try {
        // Get user's cart items
        const cartItems = await Cart.findAll({
            where: { user_id },
            include: [Product]
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total amount
        const total_amount = cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity * (1 - item.discount / 100));
        }, 0);

        // Create new order
        const newOrder = await Order.create({
            user_id,
            order_number: `ORD-${Date.now()}`,
            total_amount,
            payment_method,
            shipping_address,
            contact_number
        });

        // Create order items
        const orderItems = cartItems.map(item => ({
            order_id: newOrder.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount
        }));

        await OrderItem.bulkCreate(orderItems);

        // Clear the cart after order creation
        await Cart.destroy({ where: { user_id } });

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
    const user_id = req.user.id;

    try {
        const orders = await Order.findAll({
            where: { user_id },
            include: [OrderItem]
        });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};