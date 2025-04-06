const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// Protect all customer routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Get all customers
router.get('/', customerController.getAllCustomers);

// Get customer orders
router.get('/:id/orders', customerController.getCustomerOrders);

// Update customer
router.put('/:id', customerController.updateCustomer);

// Delete customer
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;