<<<<<<< HEAD
var PORT = 8080;
var HOST = '192.168.1.98';
=======
var PORT = 3333;
var HOST = '10.0.1.26';
>>>>>>> 000c0fa12c69d74c676b4ee59dcd54276dad5a00

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message[0] + message[1]);

});

server.bind(PORT, HOST);
