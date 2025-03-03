const logger = require("../utils/logger");


exports.errorHandler = (err, req,res,next)=>{
    console.error(err);
    logger.error(`${req.method} ${req.url} - ${err.message}`);
    res.status(500).json({
        message:err.message || 'Internal error'
    });
};