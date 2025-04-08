const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    // 1. Check for authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Authentication required' 
      });
    }

    // 2. Verify JWT token
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Check if user exists and is admin
    const user = await User.findByPk(decoded.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Admin privileges required' 
      });
    }

    // 4. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ 
      message: 'Invalid or expired token',
      error: error.message 
    });
  }
};