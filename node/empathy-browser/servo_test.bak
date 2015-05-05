//Use johnny-five to controll servo 
var five = require("johnny-five");

var app = require('http').createServer(handler), 
    io = require('/usr/local/lib/node_modules/socket.io').listen(app), 
    fs = require('fs'),
    firmata = require('/usr/local/lib/node_modules/firmata'),
    //board = new firmata.Board('/dev/ttyACM0', arduinoReady);
    board = new five.Board({port : "/dev/ttyACM0"});

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
 
app.listen(8080);
console.log("Listening on http://raspberrypi:8080...");
 
// directs page requests to html files
 
function handler (req, res) {
  fs.readFile(__dirname + '/servo_test.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading html file');
    }
 
    res.writeHead(200);
    res.end(data);
  });
}
 
// this handles socket.io comm from html files
board.on("ready", function(){ 

    //value for johnny-five
    var servo = new five.Servo(9); 
    var led = new five.Led(13);

    io.sockets.on('connection', function(socket) {
        socket.send('connected...');
        
        socket.on('message', function(data) {
            if (data == 'turn on') {
                console.log('+');
                led.on();
                //board.digitalWrite(ledPin, board.HIGH);
                //socket.broadcast.send("let there be light!");
            }
            if (data == 'turn off') {
                console.log('-');
                led.off();
                //board.digitalWrite(ledPin, board.LOW);
                //socket.broadcast.send("who turned out the light?");
            }
            if(data == 'left'){
                console.log('left');
                servo.to(30);
            }
            if(data == 'right'){
                console.log('right');
                servo.to(60);
            }
            return;
        });
     
        socket.on('disconnect', function() {
            socket.send('disconnected...');
        });
    });
});
