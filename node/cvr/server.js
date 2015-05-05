var app = require('http').createServer(handler), 
    io = require('../node_modules/socket.io').listen(app), 
    fs = require('fs'),

 
app.listen(8080);
console.log("Listening on http://localhost:8080...");
 
// directs page requests to html files
 
function handler (req, res) {
  fs.readFile(__dirname + './node/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading html file');
    }
 
    res.writeHead(200);
    res.end(data);
  });
}