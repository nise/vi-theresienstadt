/*
author: niels.seidel@nise81.com
titel: Vi-Lal
description: Video learning environment with support for real-time annotations and collaborative work structured by scripts.
**/

require( './db' );

var 
	express = require('express'),
	expressValidator = require('express-validator'),
	app = express(),
	path = require('path'),
	flash = require('connect-flash'),
	server = require('http').createServer(app),
	fs = require('node-fs'),

	// database entities
	videos = require('./routes/videos'),
	users = require('./routes/users'),
	images = require('./routes/images'),
	scripts = require('./routes/scripts'),	
	groups = require('./routes/groups'),
	// terzin specific entities
	scenes = require('./routes/scenes'),
	persons = require('./routes/persons')
	;
	

	
	//io.set('transports', ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
	var port = 3000;
	server.listen(port);
	server.setMaxListeners(0); // xxx: untested: unfinite number of listeners, default: 10;
	// http://nodejs.org/docs/latest/api/events.html#events_emitter_setmaxlisteners_n
	
	exports.getServer = function ( req, res ){
		return server;
	};

/* configure application **/
    app.set('port', process.env.PORT || port);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    

    app.use(express.static(path.join(__dirname, 'public')));
    // Passport:
	app.set('views', __dirname + '/public/vi-lab/views');
	app.set('view engine', 'ejs');
	app.engine('ejs', require('ejs-locals'));
		
	var cookieParser = require('cookie-parser');
	app.use(cookieParser());
//	app.use(express.cookieSession({ secret: 'tobo!', maxAge: 360*5 }));
		
	var json = require('express-json');
	app.use( json());
	
	var bodyParser = require('body-parser');
	app.use(expressValidator());	
	app.use( bodyParser.urlencoded({ extended: true }));
	app.use( bodyParser.json());
		
	var methodOverride = require('method-override');
	app.use( methodOverride());
		
	var session = require('express-session');
	app.use(session({
	  secret: 'keyb22oar4d cat', 
	  saveUninitialized: true,
	  resave: true
    }));
	
	app.use(flash());
	// Initialize Passport!  Also use passport.session() middleware, to support
	// persistent login sessions (recommended).
	app.use(users.passport.initialize());
	app.use(users.passport.session());
	//app.use(app.router);
	app.set("jsonp callback", true); // ?????

	


/* ACL */
//

var mongoose = require( 'mongoose' );
var conn = mongoose.connect( 'mongodb://localhost/terezin' , function(err, db){
	if(err){
		console.log(err);
	}else{
		/*
		Import data
		**/
		persons.csvImport();
		scenes.csvImport();
		videos.csvImport(); // !!! caution
		users.csvImport('data/users_basic.csv');
		scripts.importScript();
		groups.csvImport();
		//groups.csvImportFromJSON();
		//require('./routes/etherpad').generatePadGroups(); // !!!
		
		var ACL = require('./routes/aclrouts')(db, app, io);
	}	
});


// test: $ node process-2.js one two=three four
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});










/* 
Setup socket.io 
**/
//io.set('heartbeat interval', 1);
//io.set('transports', ['xhr-polling']);
//{ rememberTransport: false, transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling'] }).listen(server),
io = require('socket.io')(server);
io.sockets.on('connection', function (socket) {
	
  socket.on("disconnect", function(){
  	//console.log("ping : user disconnect");
  });
	 
	  
	/*
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
	  console.log(data);
	});
	*/
	
	//socket.broadcast.emit('user connected');
	
	/*
	socket.on('registered user', function(data) {
		console.log('socket.io:: User has registered');
		socket.broadcast.emit('broadcast-user-online', data); 
	});
	
	socket.on('updated video', function (data) {
		//console.log('socket.io:: update info eingegangen ' + data.videoid);
		console.log('video updated at client')
	  socket.broadcast.emit('broadcast',{hello: 'world2'}); 
	});*/
});



/*var io = require('socket.io').listen(80);

io.sockets.on('connection', function (socket) {
  socket.join('justin bieber fans'); // put socket in a channel
  socket.broadcast.to('justin bieber fans').emit('new fan'); // broadcast a message to a channel
  io.sockets.in('rammstein fans').emit('new non-fan'); // to another channel
});*/

exports.socketio = function (event, data){
	var io = require('socket.io')(server); 
	io.sockets.on('connection', function (socket) {
		switch(event){
			case "user.connected" :
				socket.broadcast.emit( event, {user: data[0].id, online:true } );
				//require('routes/users').setOnlineStatus({params:{ id: data[0].id}, body:{online_status:true, online_location:'index'}}, {});
				break;
			case "user.disconnected" :
				socket.broadcast.emit( event, {user: data.id, online:false } );
				//require('routes/users').setOnlineStatus({params:{ id: data[0].id}, body:{online_status:true, online_location:'index'}}, {});
				break;	
		}	
		
		socket.on('updated video', function (data) {
			//console.log('socket.io:: update info eingegangen ' + data.videoid);
			console.log('video updated at client');
		});	
	});					
}						


// 
//var lec = require('./utils/lecturnity');



/***************************************************/
/* maintainance */


/*
Lists als packages that are inside the node_packages folder. 
To remove unused packages: rm -rf node_modules && npm install
**/
var fs = require("fs");

function main() {
  fs.readdir("./node_modules", function (err, dirs) {
    if (err) {
      console.log(err);
      return;
    }
    dirs.forEach(function(dir){
      if (dir.indexOf(".") !== 0) {
        var packageJsonFile = "./node_modules/" + dir + "/package.json";
        if (fs.existsSync(packageJsonFile)) {
          fs.readFile(packageJsonFile, function (err, data) {
            if (err) {
              console.log(err);
            }
            else {
              var json = JSON.parse(data);
              console.log('"'+json.name+'": "' + json.version + '",');
            }
          });
        }
      }
    });

  });
}
//main();





