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

var listUsername = [];
io.on('connection', function(socket){
    socket.on('register user',(data)=>{
        
        listUsername.push({
            id:socket.id,
            username:data,
            
        });
        console.log(data);
        io.sockets.emit('new user',listUsername);   
    });
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat typing', (data) => { 
        socket.broadcast.emit('chat typing', data); 
    });
    socket.on('chat message', (data) => {
         io.sockets.emit('chat message', data);
        });
    socket.on('fire', (data) => {
         io.sockets.emit('chat message', data);
        });
});
