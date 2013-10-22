var amqp = require('amqp')

var connection = amqp.createConnection({host: "localhost"});
connection
var exchange = null;
connection.on("ready",function(){
  exchange = connection.exchange('mytopicexchange',{type: 'topic'},function(exchange){
    setInterval(function(){
      exchange.publish("chan.irc.clojure", {msg: "in chan.irc.clojure "+Math.random().toString()});
      exchange.publish("social.twitter.clojure", {msg: "in social.twitter.clojure "+Math.random().toString()});
    },1000);
  })
})
