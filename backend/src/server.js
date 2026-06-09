const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const { port } = require('./config/env');
const initSockets = require('./sockets');
const logger = require('./utils/logger');

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

initSockets(io);

const start = async () => {
  await connectDB();
  await connectRedis();
  server.listen(port, () => logger.info(`Server running on port ${port}`));
};

start();
