var i2c = require('i2c');
var address = 0x4;
var wire = new i2c(address, {device: '/dev/i2c-1'});
wire.scan(function(err, data) {
});
 
wire.writeByte(byte, function(err) {});
 
wire.writeBytes(command, [byte0, byte1], function(err) {});
 
wire.readByte(function(err, res) {}) 
 
wire.readBytes(command, length, function(err, res) {
});
 
wire.on('data', function(data) {
});
 
wire.stream(command, length, delay);
  
wire.write([byte0, byte1], function(err) {});
 
wire.read(length, function(err, res) {
});
