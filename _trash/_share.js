var sharejs = require('share');
var connect = require('connect');
// This hosts share.js on http://myserver.com/share.js. See connect/express docs.
var server = connect(connect.static(sharejs.scriptsDir));

var backend = livedb.client(livedbMongo('localhost:27017/test?auto_reconnect'));

// Create the sharejs server instance.
var share = sharejs.server.createClient({backend:backend});
server.use(browserChannel({webserver: server}, function(client) {
var stream = new Duplex({objectMode: true});
stream._write = function(chunk, encoding, callback) {
	if (client.state !== 'closed') {
	client.send(chunk);
	}
	callback();
};


stream._read = function() {};
stream.headers = client.headers;
stream.remoteAddress = stream.address;
client.on('message', function(data) {
	stream.push(data);
});
stream.on('error', function(msg) {
	client.stop();
});
client.on('close', function(reason) {
	stream.emit('close');
	stream.emit('end');
	stream.end();
});
// Actually pass the stream to ShareJS

