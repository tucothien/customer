var express = require('express'),
    app = express();
var http = require( "http" ).createServer( app );
var io = require( "socket.io" )( http );

app.use(express.static(__dirname + ''));

// app.listen(8088)
var chatList = [];
io.on('connection', function(socket){
	console.log("User connected");

	socket.emit("lastMessage",chatList);

	socket.on('chatMessage', function(from, msg){
		io.emit('chatMessage', from, msg);    //chac la broadcast
		        //console.log(from + " : " + msg);
		chatList.push({
			user : from,
			content : msg
		});
	});
	socket.on('notifyUser', function(user){
		io.emit('notifyUser', user);
	});
});

http.listen(8088, "127.0.0.1");
