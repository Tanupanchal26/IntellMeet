const { createClient } = require('redis');
const { redis } = require('./env');
const logger = require('../utils/logger');

let client = null;

const connectRedis = async () => {
  client = createClient({ url: redis.url });

  client.on('error', (err) => logger.error(`Redis error: ${err.message}`));
  client.on('connect', () => logger.info('Redis connected'));

  await client.connect();
  return client;
};

const getRedisClient = () => client;

module.exports = { connectRedis, getRedisClient };
