const app = require('express');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message });
  });
});
module.exports.socketServer = async (req, res) => {
  res.send('Socket');
};