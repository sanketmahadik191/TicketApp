const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate users
exports.authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Attach user info to request

        if (!req.user) {
            return res.status(401).json({ message: 'Invalid token. User not found.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Middleware to authorize specific roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied. Unauthorized role.' });
        }
        next();
    };
};
