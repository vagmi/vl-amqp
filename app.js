var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
var amqp = require('amqp')
app.listen(8081);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      console.log(err);
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
var connection = amqp.createConnection({host: "localhost"});
  connection.on("ready",function(){
    console.log("Connect made");
    exchange = connection.exchange('mydirectexchange',{type: 'direct'},function(exchange){
      var routingKey= "K1"
      connection.queue("myqueue"+routingKey,function(q1){
        q1.bind(exchange,routingKey);
        q1.subscribe(function(message) {
          console.log("Got message");
          console.log(message);
          socket.emit("from_amqp",message);
        });
      });
    })
  })
});
