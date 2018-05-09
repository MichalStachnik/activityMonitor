const http = require('http');
const path = require('path');
const os = require('os');
const fs = require('fs');
const socketIO = require('socket.io');
const express = require('express');

const app = express();
// app.use(express.static(__dirname));

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
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.write('here');
  // res.end();
};

// onRequest = (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   let myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
//   myReadStream.pipe(res);
// }

let server = http.createServer(onRequest).listen(8000, () => console.log('listening on 8000'));

// let server = http.createServer(app).listen(8000);

// let server = app.listen(8000, () => {
//   console.log('listening on 8000');
// });
let io = socketIO(server);


io.on('connection', (socket) => {
  console.log('CONNECTED', socket.id);

  // socket.on('data', (data) => {
  //   io.sockets.emit('received', data)
  // });

  setInterval(() => {
    console.log('sending', Date.now());
    io.sockets.emit('received', {message: os.freemem() / os.totalmem()});
  }, 1000); 

});

  

