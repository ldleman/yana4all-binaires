var socket;
var Yana = {
    clientConnected : function(client){console.log('client connected:'+client.type)},
    clientDisconnected : function(client){console.log('client disconnected:'+client.type)},
    emotion : function(emotion){console.log('Emotion:'+emotion)},
    mute : function(){console.log('muted');},
    talk : function(){console.log('talk');},
    image : function(image){console.log('image:'+image);},
    text : function(text){console.log('text:'+text);}
};


$(document).ready(function(){
    if(typeof(io)=='undefined') return;
  
	var socket = io();

	socket.on('action', function(data){
    	switch(data.action){
    		case 'emotion':
                Yana.emotion(data.type);
    		break;
            case 'clientConnected':
                Yana.clientConnected(data.client);
            break;
            case 'clientDisconnected':
                Yana.clientDisconnected(data.client);
            break;
            case 'emotion':
                Yana.emotion(data.type);
            break;
            case 'image':
                Yana.image(data.url);
            break;
            case 'text':
                Yana.text(data.text);
            break;
            case 'mute':
                Yana.mute();
            break;
            case 'talk':
                Yana.talk();
            break;
    	}
  	});
});


