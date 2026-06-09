module.exports = (io, socket) => {
  socket.on('meeting:join', (roomId) => {
    socket.join(`meeting:${roomId}`);
    socket.to(`meeting:${roomId}`).emit('meeting:user-joined', { socketId: socket.id });
  });

  socket.on('meeting:signal', ({ roomId, signal, to }) => {
    io.to(to).emit('meeting:signal', { signal, from: socket.id });
  });

  socket.on('meeting:leave', (roomId) => {
    socket.leave(`meeting:${roomId}`);
    socket.to(`meeting:${roomId}`).emit('meeting:user-left', { socketId: socket.id });
  });
};
