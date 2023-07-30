const socketIO = require('socket.io');

function startWebSocketServer(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('WebSocket connection established.');
    io.emit('message', "hello");

    socket.on('message', (message) => {
      console.log('Received message:', message);
      io.emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket connection closed.');
    });
  });
}

module.exports = startWebSocketServer;
