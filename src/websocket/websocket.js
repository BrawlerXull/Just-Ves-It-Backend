
module.exports = function createWebSocketServer(httpServer) {
  const WebSocket = require('ws');
  const websocketServer = new WebSocket.Server({ server: httpServer });

  websocketServer.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
      websocketServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });

  return websocketServer;
};
