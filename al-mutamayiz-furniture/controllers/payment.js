const Order = require('../models/Order');

// Process payment
exports.processPayment = async (req, res) => {
    const { order_id, payment_method } = req.body;

    try {
        // Find the order
        const order = await Order.findByPk(order_id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Here you would integrate with a payment gateway API
        // For demonstration, we'll simulate a successful payment
        const paymentSuccess = true; // Simulate payment success

        if (paymentSuccess) {
            order.status = 'completed';
            await order.save();
            res.status(200).json({ message: 'Payment processed successfully', order });
        } else {
            res.status(500).json({ message: 'Payment processing failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error processing payment', error });
    }
};