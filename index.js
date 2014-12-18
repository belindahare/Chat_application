
// This is setting up our application.
// Express initializes app as a function handler that we can supply to an HTTP server (in line 2)
// We define a route handler (/) that gets called when we navigate to the page
// We make the server listen on port 3000
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// This calls res.send and passing it an html string.  Instead of putting all of our program's html here, we'll create an index.html file
// We'll rework this code block to accomidate the index.html file
// app.get('/', function(req, res){
//   res.send('<h1>Lets Chat!</h1>');
// });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// This initializes a new instance of socket.io by passing the http object.
// Next, we listen on the connection event for incoming sockets, and log it to the console.
// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });
// This displays the message in the terminal
// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });
// This displays the message for everyone:
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
