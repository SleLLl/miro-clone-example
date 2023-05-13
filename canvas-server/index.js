const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://127.0.0.1:5174",
  }
});
const cors = require('cors');

// Allow cross-origin requests from all domains
app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('BoxWasCreated', (msg) => {
    console.log(msg);
    socket.broadcast.emit('BoxWasCreated', msg);
  });

  socket.on('UserMouseWasMoved', (msg) => {
    console.log(msg);
    socket.broadcast.emit('UserMouseWasMoved', msg);
  });

  socket.on('PointWasDrawn', (msg) => {
    socket.broadcast.emit('PointWasDrawn', msg);
  });

});

http.listen(8080, () => {
  console.log('listening on *:8080');
});
