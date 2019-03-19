var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection',(socket)=>{

    //Cambio de turno
    socket.on('turno',(data)=>{
      socket.broadcast.emit('turno',data);
    });

    //Disparo a nave
    socket.on('disparo',(data)=>{
      socket.broadcast.emit('disparo',data);
    });

    //Respuesta de disparo
    socket.on('respuesta',(data)=>{
      socket.broadcast.emit('respuesta',data);
    });
});