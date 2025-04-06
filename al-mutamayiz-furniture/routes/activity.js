const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// Protect all activity routes
router.use(authMiddleware);

// Get user activity logs
router.get('/', activityController.getUserActivityLogs);

// Admin-only route to get any user's activity logs
router.get('/user/:id', adminMiddleware, activityController.getUserActivityLogs);

module.exports = router;