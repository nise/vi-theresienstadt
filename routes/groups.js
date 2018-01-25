
var 
	mongoose = require( 'mongoose' ),
	Groups  = mongoose.model( 'Groups' )
	Users  = mongoose.model( 'Users' )
	fs = require('node-fs'),
	csv = require('csv')
	;
	

/***************************************************/
/* GROUP MGMT */

	var groups = [];
	
exports.csvImportFromJSON = function ( req, res ){
	// destroy dataset first
	Groups.remove({}, function ( err, docs ){
		console.log('Removed all groups to replace them by a JSON file.');
		var vi = require('../data/groups.json');

		for(var j = 0; j < vi.length; j++){
			var t = new Groups(vi[j])
				.save( function( err, video, count ){
					if(err){
						console.log(err)
					}else{
						console.log('Imported group '+video.id+' '+video.id);
					}	
				});
		}	
	});
	//	
	
	return;				
};	

/* Load groups data from csv file. Insert data into database **/
exports.csvImport = function ( req, res ){
	// read file
	fs.readFile(__dirname+'/../data/groups.csv', function read(err, data) {
		Groups.remove({}, function(err) { 
			console.log('Removed Groups from DB') 
			csv.stringify(data, function(data){
				// define group for each line
				for(var i = 1; i < data.length; i++){
					new Groups({
						id: data[i][0],
						description: data[i][1],
						persons: data[i][2],
						hs: data[i][3], 
						videos : data[i][4].split(';') // data[i][3],	"videos" : ["5294bc22985254e831000002", "2", "3"]
					})
					.save( function( err, videos, count ){
						if(err){
							console.log(err)
						}
					});	
				}
				console.log('Imported Groups from data/groups.js to DB');
			});// end read
		});// end csv	
	}); // end remove
};

/*
Group formation
status: unfinished
- seperate sub routines
- treat special cases, e.g. when number of people can not be devided by the number of groups
- implement Kohnert
- formGroups per Phase ... consider merging or splitting groups
- save groups
**/
exports.formGroups = function ( req, res ){
	Users.find().exec( function ( err, users ){
		if(err){ 
			console.log(err);
			res.end('error'); 
		}else{
			var groups = [];
			var n = req.query.group_algorithm_val;
			var method = req.query.group_algorithm;
			switch( method ){
				case "method1" :
					/**/// methode 1: divide users in n groups as they are
					var numberOfGroups = n;
					for(var i = 0; i < users.length; i++){
						var num = i % numberOfGroups; 
						if ( num in groups == false){ groups[ num ] = []; }
						groups[ num ].push(users[i]); 
					}
					break;
				case "method2" :	
					/**/// methode 2: divide users in n groups randomly
					var numberOfGroups = n;
					users = shuffle(users);
					for(var i = 0; i < users.length; i++){
						var num = i % numberOfGroups;
						if ( num in groups == false){ groups[ num ] = []; }
						groups[ num ].push(users[i]); 
					}
					break;
				case "method3" :			
					/**/// methode 3: distribute users in groups of n people as they are 
					var groupSize = n;
					for(var i = 0; i < users.length; i++){
						var num = Math.floor(i / groupSize); 
						if ( num in groups == false){ groups[ num ] = []; }
						groups[ num ].push(users[i]); 
					}
					break;
				case "method4" :
					/**/// methode 4: distribute users in groups of n people randomly
					users = shuffle(users);
					var groupSize = n;
					for(var i = 0; i < users.length; i++){
						var num = Math.floor(i / groupSize); 
						if ( num in groups == false){ groups[ num ] = []; }
						groups[ num ].push(users[i]); 
					}
					break;
				case "method5" :
					/**/// methode 5: distribute users in groups of n people by multiple (homogene or heterogene) crtierias
					 // Kohnert2013
			} 
			// save Groups
			res.type('application/json');
			res.jsonp(groups);
		}
	});
}

// shuffle array using the Fisher-Yates shuffle algorithm
shuffle = function (array) {
	for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
	}
	return array;
}

/*******************************************/
/* GroupAL */

/*
Pair Performance Index, Manhattan-Metrik
criteria: { name: "xy", type: "homogene", weight:0.4 }
**/
pairPerformanceIndex = function(user1, user2){
	var sum_homo = 0;
	var sum_hetero = 0;
	for(var i = 0; i < user1.criteria.length; i++){
		// different eines Kriterium zw. den usern
	}
	return sum_hetero - sum_homo;
}

/*
Group Performance Index
 = Mittelwert aller npi-Paare innerhalb einer Gruppe
**/
groupPerformanceIndex = function(){
	
}


/*
Kohorten Performanz Index
**/
cohortPerformanceIndex = function(){

}

/*
Matcher
**/
matcher = function(){

}


/*
Optimizer
**/
optimizer = function(){}

/*

**/
exports.getGroups = function(req, res) {
	Groups.collection.find().sort( 'id' ).toArray(function(err, items) {
		if(err){
			console.log(err)
		}else{
      res.type('application/json');
			res.jsonp(items);  
			res.end('done');
		}	
  });
};
