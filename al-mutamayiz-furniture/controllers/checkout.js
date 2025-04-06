const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Checkout process
exports.checkout = async (req, res) => {
    const { payment_method, shipping_address, contact_number } = req.body;
    const user_id = req.user.id;

    try {
        // Get user's cart items
        const cartItems = await Cart.findAll({
            where: { user_id }
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

        // Clear the cart after order creation
        await Cart.destroy({ where: { user_id } });

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error during checkout', error });
    }
};