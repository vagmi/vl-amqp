var amqp = require('amqp')
var connection = amqp.createConnection({host: "localhost"});
var exchange = null;
connection.on("ready",function(){
  exchange = connection.exchange('mydirectexchange',{type: 'direct'},function(exchange){
    var routingKey=process.argv[2] || "K1"
    connection.queue("myqueue"+routingKey,function(q1){
      q1.bind(exchange,routingKey);
      q1.subscribe(function(message) {
        console.log("From Queue "+ routingKey);
        console.log(message);
      });
    });
  })
})
