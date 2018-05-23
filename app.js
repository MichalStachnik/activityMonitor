const http = require('http');
const path = require('path');
const os = require('os');
const fs = require('fs');
const socketIO = require('socket.io');
const express = require('express');

const app = express();
const port = process.env.PORT || 8000;

onRequest = (req, res) => {
  fs.readFile('./index.html', null, (err, data) => {
    if(err) {
      res.writeHead(404);
      res.write('File not found');
    }
    else {
      res.write(data);
    }
    res.end();
  });
};

let server = 
  http
    .createServer(onRequest)
    .listen(port, () => console.log('listening on 8000'));
    
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('CONNECTED', socket.id);
  setInterval(() => {
    io.sockets.emit('received', {message: os.freemem() / os.totalmem()});
  }, 1000); 

});

  

