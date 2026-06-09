const Message = require('../models/Message.model');

module.exports = (io, socket) => {
  socket.on('chat:join', (meetingId) => socket.join(`chat:${meetingId}`));

  socket.on('chat:message', async ({ meetingId, content }) => {
    const message = await Message.create({ meeting: meetingId, sender: socket.user?.id, content });
    io.to(`chat:${meetingId}`).emit('chat:message', await message.populate('sender', 'name avatar'));
  });

  socket.on('chat:leave', (meetingId) => socket.leave(`chat:${meetingId}`));
};
