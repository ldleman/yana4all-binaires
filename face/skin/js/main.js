var intervals = [];
var secureMute;
var nextMute;
$(document).ready(function(){

	Yana.emotion = function(emotion){
		log("Emotion <"+emotion+">");
		$('body').addClass('emotion_'+emotion);
		setTimeout(function(){
			$('body').removeClass('emotion_'+emotion);
		},5000);
	};

	Yana.talk = function(){
		log("Talking");
		clearTimeout(nextMute);
		speakAnimation();
		secureMute = setTimeout(function(){
			log("Default mute");
			muteAnimation();
		},50000);
		
	};

	Yana.clientConnected = function(client){
		log("Client "+client.type+" - "+client.location+" connected");
		$('#status-bar ul li[data-id="'+client.type+'-'+client.location+'"]').remove();
		var li = $('<li style="display:none;" class="client-'+client.type+'" data-id="'+client.type+'-'+client.location+'">'+client.location+' ~ '+client.user+'</li>');
		$('#status-bar ul').append(li);
		li.fadeIn();
	};
	Yana.clientDisconnected = function(client){
		log("Client "+client.type+" - "+client.location+" disconnected");
		$('#status-bar ul li[data-id="'+client.type+'-'+client.location+'"]').fadeOut();
	};

	Yana.mute = function(){
		log("Muted");
		clearTimeout(secureMute);
		nextMute = setTimeout(function(){
			muteAnimation();
		},500);
	};

	Yana.image = function(url){
		log("Showing image");
		image(url);
	};

	Yana.text = function(text){
		log("Showing text");
		alert('I\'m writing a text : '+text);
	};

	log("Loading graphic voice system....");
	initVoiceDot();
	log("Loading hour....");
	initHour();




});


function initHour(){
			setInterval(function(){
				var now = new Date();
				$('#hour-container span').html(now.getHours()+':'+now.getMinutes()+':'+now.getSeconds() );
			},1);
		}

function initVoiceDot(){
			for(i=0;i<100;i++)
			$('#speak-container').append('<div class="tonality"></div>');
			muteAnimation();
		}



		function speakAnimation(){
			clearAnimation();
			$('.tonality').each(function(i,element){
				intervals.push(setInterval(function(){
					var rand = Math.floor((Math.random() * ($( window ).height()/1.5) ) + 5); 
					$(element).css('height',(rand/2)+'px');
					$(element).css('margin-top',-(rand/4)+'px');
				},200));
			});
		}

		
		
		function clearAnimation(){
			$('.tonality').css('height','2px').css('margin-top','0px').css('opacity','1');
			for (var i = 0; i < intervals.length; i++)
					window.clearInterval(intervals[i]);
		}

		function muteAnimation(){
			clearAnimation();
			$('.glow').css('left','90%');
			$('.tonality').each(function(i,element){
				intervals.push(setInterval(function(){
					var rand = Math.floor((Math.random() * ($( window ).height()/1.5) ) + 5); 
					$(element).css('margin-top',-(rand/4)+'px');
					$(element).css('opacity',Math.random());
					
					
				},300));
			
			});
		}

		function log(text){
			var now = new Date();
			$('#log-container').prepend(now.getHours()+':'+now.getMinutes()+'.'+now.getSeconds()+' | '+text+ '<br/>');
			$('#log-container').scrollTop = $('#log-container').scrollHeight;
		}

		function icon(icon){
			$('#icon-container').attr('class','fa fa-'+icon);
			$('#icon-container').show();
			setTimeout(function(){
				$('#icon-container').fadeOut(500);
			},2000);
		}

		function image(image){
			$('body').attr('style','background:url("'+image+'") #111111 no-repeat center center ;');
		
			setTimeout(function(){
				$('body').removeAttr('style');
			},4000);
		}
