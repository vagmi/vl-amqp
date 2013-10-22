var childProcess = require('child_process');
var prgrm='node';
var server = 'server.js'

var launchProcess = function(){
 var process = childProcess.spawn(prgrm, [server]);
  process.stdout.on('data',function(data){
    console.log(data.toString());
  });
  process.on('close',function(cod){
    launchProcess();
  })
}
launchProcess();
