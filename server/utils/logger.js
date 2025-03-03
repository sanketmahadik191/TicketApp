const winston = require('winston');

// Create a logger with different log levels
const logger = winston.createLogger({
    level: 'info', // Default log level
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to file
        new winston.transports.File({ filename: 'logs/combined.log' }) // Log all messages to file
    ]
});

module.exports = logger;
