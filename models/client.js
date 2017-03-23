
var deepstream = require('deepstream.io-client-js');

var config = require('../config');
	console.log('Config >>>> : ', config);
	console.log('Config >>>> host: ', config.host);
	console.log('Config >>>> port: ', config.port);

var client = deepstream(config.host+':'+config.port).login();
// console.log('Client >>> ', client);
client.on('error', function(error, event, topic ) {
 	//console.log('Erro >>> ', error);
	// console.log('Evento >>> ', event);
	// console.log('Topico >>> ', topic);
    console.log(error, event, topic);
  } 
);

if (client) {
  var datauid = client.getUid();
  console.log('Client UID >> ', datauid);
} 

module.exports = client;
