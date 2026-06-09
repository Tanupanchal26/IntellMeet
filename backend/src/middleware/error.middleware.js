const logger = require('../utils/logger');

const errorMiddleware = (err, req, res, next) => {
  logger.error(err.message);
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
};

module.exports = errorMiddleware;
