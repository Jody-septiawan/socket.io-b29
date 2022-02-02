const socketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connect');
    console.log('Client ID: ', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnect');
    });
  });
};

module.exports = socketIo;
