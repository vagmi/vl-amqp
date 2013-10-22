var amqp = require('amqp')

var connection = amqp.createConnection({host: "localhost"});
connection
var exchange = null;
connection.on("ready",function(){
  exchange = connection.exchange('myfanoutexchange',{type: 'fanout'},function(exchange){
    setInterval(function(){
      exchange.publish("", {msg: "message for to be fanned out"+Math.random().toString()});
    },1000);
  })
})
