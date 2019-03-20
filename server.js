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
let room = {}, roomN = 1;

io.on('connection',(socket)=>{

  //crea la room
  socket.on('create room', () =>{
    if(!room.hasOwnProperty(roomN)){//comprueba que no exista la room
      socket.join(roomN);
      room = io.sockets.adapter.rooms;
      socket.emit('room created', roomN);
      console.log(roomN);
      roomN++;
    }
    console.log(room)
  });
  //unirse a room
  socket.on('join room',(data) =>{
    if(room.hasOwnProperty(data)){//comprueba que exista la room
      if(room[data].length <2){
      socket.join(data);
      room = io.sockets.adapter.rooms;
      socket.emit('room joined', data);
      console.log(room)
      }else{socket.emit('error join','room full')}
    }else{socket.emit('error join','room not found')}
  });
  //chat de room
  socket.on('chat msg', (data) =>{
    console.log(data);
    socket.in(data.roomN).emit('chat msg', data)
  });

    //Cambio de turno
    socket.on('turno',(data)=>{
      socket.in(data.roomN).emit('turno',data);
    });

    //Disparo a nave
    socket.on('disparo',(data)=>{
      socket.in(data.roomN).emit('disparo',data);
    });

    //Respuesta de disparo
    socket.on('respuesta',(data)=>{
      socket.in(data.roomN).emit('respuesta',data);
    });

    socket.on('disconnected',(data)=>{
      socket.leave(data)
    });
});