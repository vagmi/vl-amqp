var amqp = require('amqp')
var connection = amqp.createConnection({host: "localhost"});
connection.on("ready",function(){
  connection.exchange('mytopicexchange',{type: 'topic'},function(exchange){
    connection.queue("Q1",function(q1){
      q1.bind(exchange,"chan.*.clojure");
      q1.subscribe(function(message) {
        console.log("from Q1");
        console.log(message);
      });
    });
    connection.queue("Q2",function(q1){
      q1.bind(exchange,"chan.irc.*");
      q1.subscribe(function(message) {
        console.log("from Q2");
        console.log(message);
      });
    });
    connection.queue("Q3",function(q1){
      q1.bind(exchange,"*.*.clojure");
      q1.subscribe(function(message) {
        console.log("from Q3");
        console.log(message);
      });
    });
  })
})
