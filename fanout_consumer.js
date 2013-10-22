var amqp = require('amqp')
var connection = amqp.createConnection({host: "localhost"});
connection.on("ready",function(){
  connection.exchange('myfanoutexchange',{type: 'fanout'},function(exchange){
    connection.queue("Q1",function(q1){
      q1.bind(exchange,"");
      q1.subscribe(function(message) {
        console.log(message);
      });
    });
    connection.queue("Q2",function(q1){
      q1.bind(exchange,"");
      q1.subscribe(function(message) {
        console.log(message);
      });
    });
  })
})
