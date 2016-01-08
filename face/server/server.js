var conf = require('../../bin/conf.json');
var net = require('net');
var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var received = '';
var client = new net.Socket();
var clientVersion = 2;
app.use(express.static(__dirname + '/../skin'));

http.listen(3000,function(){
	console.log('express/io listening on *:3000');
});

io.sockets.on('connection',function(socket){
	console.log("Skin launched");

	connectToServer();

	socket.on('disconnect', function(){
    	console.log('Skin disengaged, disconnect socket ...');
    	client.destroy();
  	});
});


function connectToServer(){
	client.connect(conf.port, conf.host, function() {
		console.log('Connected to server on '+conf.host+':'+conf.port);
		client.write('{"action":"CLIENT_INFOS","version":"'+clientVersion+'","type":"face","location":"'+conf.location+'","token":"'+conf.token+'"}<EOF>');
		client.write('{"action":"GET_CONNECTED_CLIENTS"}<EOF>');
	});
}

function handleResponse(message){

	console.log("Parsing message : "+message+" \r\n");
	messages = message.split('<EOF>');
	for(var i in messages){
		if(messages[i].trim()=='') continue;
		try {
		var json = JSON.parse(messages[i]);
		io.emit('action', json);
		console.log('- Action requested from server : '+json.action);
		}catch(err){
 			console.log("Error pargins command : "+err);
		}
	}
}

client.on('data', function(data) {
	received += data;
	if(received.slice(-5) == '<EOF>'){
		received = received.substring(0, received.length - 5)
		handleResponse(received);
		received = '';
	}
});

client.on('close', function() {
	//console.log('Connection closed');
});

client.on('end', function() {
    console.log('Serveur end, try to reconnect in 5 sc...');
    setTimeout(function(){connectToServer();},5000);
});

client.on('error', function() {
    console.log('Serveur disconnected, try to reconnect in 5 sc...');
    setTimeout(function(){connectToServer();},5000);
});