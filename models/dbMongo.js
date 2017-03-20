var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://voidp34r:akuma@ds145848.mlab.com:45848/voidpear', function(err) {
  if (err) {
    console.log('Sem conexão com MongoDb na máquina remota.');
	console.log('Vai o MongoDb Local mesmo :P');
	mongoose.connect('mongodb://localhost/test', function(err) {
	  if (err) {
	    console.log('Crap!!! ,nem mesmo o  Db local funcionou :( ');
	  }
	});
  }
});

// var db_local = mongoose.connect('mongodb://localhost/test', function(err) {
//   console.log('Já que o banco de dados remoto não funciona vamos tentar com o local mesmo :P');
//   if (err) {
//     console.log('Não conseguimos conectar ao bando de dados MONGODB na máquina local.....');
//     console.log('Realmente temos um problema! :(');
//   } else {
//     console.log(':P Bando de dados local Conectado!');
//   }
// });
  
// console.log(db);


// Connect mongoose
// mongodb://USER:PASSWORD@localhost/DATABASE
// var db = mongoose.createConnection('mongodb://675769210965-compute@104.155.167.71:27017/test');
// mongoose.connect('mongodb://localhost/test', function(err) {
//   if (err) {
//     console.log('Could not connect to mongodb on localhost.');
//   }
// });

module.exports = db;