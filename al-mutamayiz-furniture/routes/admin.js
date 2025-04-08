const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const adminMiddleware = require('../middleware/admin');

// Apply admin middleware to all routes
router.use(adminMiddleware);

// Admin dashboard
router.get('/dashboard', adminController.getDashboard);

// Store settings
router.get('/settings', adminController.getSettings);
router.put('/settings', adminController.updateSettings);

// Product management
router.get('/products', adminController.getProducts);
router.post('/products', adminController.createProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

// Order management
router.get('/orders', adminController.getOrders);
router.put('/orders/:id/status', adminController.updateOrderStatus);

// User management
router.get('/users', adminController.getUsers);
router.put('/users/:id', adminController.updateUser);

module.exports = router;