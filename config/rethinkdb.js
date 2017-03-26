var DSServer = require("deepstream.io");
var deepstream = require('deepstream.io-client-js');
var DSRethinkConnector = require("deepstream.io-storage-rethinkdb");
var r = require('rethinkdb');

// Setup the deepstream server
var server = new DSServer();
server.set("host", "localhost");
server.set("port", 6020);

// Setup the RethinkDB storage connector
server.set("storage", new DSRethinkConnector({
    port: 28015,
    host: "localhost",
    splitChar: "/",
    defaultTable: "deepstream"
}));

function test () {
 
  var connection = null;
  r.connect( {
    host: 'localhost',
    port: 28015,
    splitChar: "/",
    defaultTable: "deepstream"
  }, function(err, conn) {
      if (err) throw err;
      connection = conn;
  });


  r.connect( {
    host: 'localhost',
    port: 28015,
    splitChar: "/",
    defaultTable: "deepstream"
  }, function(err, conn) {
    if (err) throw err;
    r.dbList().run(conn, function (err, data) {
      if (err) throw err;
        console.log('Bando de dados atuais: ', data);
    });
  });

  r.connect( {
    host: 'localhost',
    port: 28015,
    splitChar: "/",
    defaultTable: "deepstream"
  }, function(err, conn) {
    if (err) throw err;
    r.dbCreate('void001').run(conn, function (err, data) {
      if (err) throw err;
        console.log(data);
    });
  });



  r.db('test').tableCreate('voidtest').run(connection, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
  })
}

function wrapRecord(record) {
  record.subscribe(function(data) {
    for (var prop in data)
      if (data.hasOwnProperty(prop))
        record.$set(prop, data[prop]);
  });

  return record;
}

// Connect to the deepstream server
var ds = deepstream("localhost:6020").login();
// Create a unique voidpear for the new record
var voidpear = "voidpear/" + ds.getUid();
// Instantiate a new record
var record = ds.record.getRecord(voidpear);
console.log(record.name, ' | ');
// Subscribe to changes on the `record` property
record.subscribe(record, function(value) {
  console.log("record updated:", value);
});

// record.set({ name: 'void', type:});

// Run the server
server.start();

module.exports = record;
