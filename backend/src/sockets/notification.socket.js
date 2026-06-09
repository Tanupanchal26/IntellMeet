module.exports = (io, socket) => {
  socket.on('notification:subscribe', (userId) => socket.join(`user:${userId}`));

  const sendNotification = (userId, payload) => io.to(`user:${userId}`).emit('notification', payload);

  socket.sendNotification = sendNotification;
};
