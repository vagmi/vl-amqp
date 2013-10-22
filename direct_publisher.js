var amqp = require('amqp')

var connection = amqp.createConnection({host: "localhost"});
connection
var exchange = null;
connection.on("ready",function(){
  exchange = connection.exchange('mydirectexchange',{type: 'direct'},function(exchange){
    var queues = ["K1","K2","K3"];
    setInterval(function(){
      console.log("publishing ....");
      var randKey = queues[parseInt(queues.length*Math.random())];
      exchange.publish("K1", {msg: "message for " + randKey});
    },1000);
  })
})
