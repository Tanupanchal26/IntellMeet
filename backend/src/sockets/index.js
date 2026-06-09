const chatSocket = require('./chat.socket');
const meetingSocket = require('./meeting.socket');
const notificationSocket = require('./notification.socket');

const initSockets = (io) => {
  io.on('connection', (socket) => {
    chatSocket(io, socket);
    meetingSocket(io, socket);
    notificationSocket(io, socket);
  });
};

module.exports = initSockets;
