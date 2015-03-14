//Use johnny-five to controll servo 
var five = require("johnny-five");

var PORT = 3333;
var HOST = '0.0.0.0';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

	//firmata = require('/usr/local/lib/node_modules/firmata'),					//For RasPi
	firmata = require('../../node_modules/johnny-five/node_modules/firmata'),		//For Mac
    board = new five.Board({port : "/dev/ttyACM0"});							//For RasPi
    //board = new five.Board({port : "/dev/tty.usbmodem1411"});					//For Mac


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
	
	//Initialize
	servo_x.to(90);
	servo_y.to(90); 

	console.log("before server.on");
	server.on('listening', function () {
	    var address = server.address();
	    console.log('UDP Server listening on ' + address.address + ":" + address.port);
	});

	server.on('message', function (message, remote) {
    	console.log(remote.address + ':' + remote.port +' - ' + message[0] + message[1]);
    	servo_x.to(message[0]);
		servo_y.to(message[1]);
		if(message[0] == 255 && message[1] == 255){
			servo_x.to(90);
			servo_y.to(90); 
		}
	});

	server.bind(PORT, HOST);
});
