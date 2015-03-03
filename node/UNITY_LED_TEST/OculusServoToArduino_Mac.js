//Use johnny-five to controll servo 
var five = require("johnny-five");

var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: 8124}),
	//firmata = require('/usr/local/lib/node_modules/firmata'),					//For RasPi
	firmata = require('../node_modules/johnny-five/node_modules/firmata'),		//For Mac
    //board = new five.Board({port : "/dev/ttyACM0"});							//For RasPi
    board = new five.Board({port : "/dev/tty.usbmodem1411"});					//For Mac


    var ledPin = 13;
	var ServoPin_y = 9;

function arduinoReady(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Firmware: ' + board.firmware.name 
      + '-' + board.firmware.version.major 
      + '.' + board.firmware.version.minor);
 
    var ledOn = true;
    board.pinMode(ledPin, board.MODES.OUTPUT);
}

// this handles socket.io comm from html files
console.log("before board.on");

board.on("ready", function(){ 
	console.log("after board.on");

	//value for johnny-five
	var servo_x = new five.Servo(9); 
	var servo_y = new five.Servo(11);

	//pin for motor
	board.pinMode(3, five.Pin.ANALOG);
  	board.pinMode(2, five.Pin.OUTPUT);
	board.pinMode(1, five.Pin.OUTPUT);
	
	//Initialize
	servo_x.to(90);
	servo_y.to(90); 

	var led = new five.Led(13);

	console.log("before wss.on");
	wss.on('connection', function(ws) {
	//console.log("after wss.on");

		ws.on('message', function(message) {
			//console.log('received: %s', message);
			//console.log(message);
			var coords = message.split(' ');		
			var x_rot = Math.floor(coords[0]);
			var y_rot = Math.floor(coords[1]);
			var xbox_key = Math.floor(coords[2]);
			servo_x.to(x_rot);
			servo_y.to(y_rot);

			//console.log(xbox_key);
			if(xbox_key === 1){
				//forward
			  board.analogWrite(3, 200);
			  board.digitalWrite(2, board.HIGH);
			  board.digitalWrite(1, board.LOW);
			  //console.log("forward");
			}else if(xbox_key === 0){
				//back
			  board.analogWrite(3, 200);
			  board.digitalWrite(2, board.LOW);
			  board.digitalWrite(1, board.HIGH);
			  //console.log("back");
			}else{
				//stop
			  board.analogWrite(3, 0);
			  board.digitalWrite(2, board.HIGH);
			  board.digitalWrite(1, board.HIGH);
			  //console.log("stop");			  
			}
		});	
	}); 
});