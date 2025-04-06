const ActivityLog = require('../models/ActivityLog');

// Get user activity logs
exports.getUserActivityLogs = async (req, res) => {
    const user_id = req.user.id;

    try {
        const logs = await ActivityLog.findAll({
            where: { user_id },
            order: [['timestamp', 'DESC']]
        });
        res.status(200).json({ logs });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching activity logs', error });
    }
};