const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    // Only update for authenticated requests
    if (req.user && req.user.id) {
      await User.update(
        { last_active: new Date() },
        { where: { id: req.user.id } }
      );
    }
    next();
  } catch (error) {
    console.error('Error updating last_active:', error);
    next(); // Continue even if tracking fails
  }
};