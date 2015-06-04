


//var utils    = require( '../utils' );
var 
	mongoose = require( 'mongoose' ),
	Videos  = mongoose.model( 'Videos' )
	fs = require('node-fs'),
	csv = require('csv')
	;



/*
Import Videos data from csv
**/
exports.csvImport = function ( req, res ){
	// destroy dataset first
	Videos.find({}, function ( err, docs ){
		var vi = require('../data/videos.json');

		for(var j = 0; j < vi.length; j++){
			//for(var i = 0; i < vi[j].toc.length; i++){ vi[j].toc[i].start = decimal2float(String(vi[j].toc[i]._comment));}
			var t = new Videos(vi[j])
				.save( function( err, video, count ){
					if(err){
						console.log(err)
					}else{
						console.log('Imported video '+video.id+' '+video.id);
					}	
				});
		}	
		for(var i in docs){
				docs[i].remove();
		}
	});
	//	
	
	return;				
};

decimal2float = function(time){
	var t = time.split(':'); 
	// remove leading Null
	for(var i in t){ if( t[i].charAt(0) == 0){ t[i] = t[i].charAt(1); } }
	var z = Number(t[0])*3600 + Number(t[1])*60 + Number(t[2]) + Number(t[3]) / 60;
	if(typeof z === 'number' && isNaN(z) == false){
		return z;
	}
	return 0;
}


/*
REST API CALL
**/
exports.index = function ( req, res ){ 
  res.render( 'videos', { title : 'Express Videos Example' });
};


exports.getJSON = function(req, res) { // console.log(88+'---------------------------')
/*  Videos
		.find()
		.sort( 'id' )
		.lean()
		.exec( function ( err, items ){ 
			if(err){ console.log(err); }
			res.type('application/json');
			res.jsonp(items);
		});*/
	Videos.collection.find().toArray(function(err, items) {
    res.type('application/json');
		res.jsonp(items);  
		res.end('done');
  });
};


//
exports.getOneJSON = function(req, res) { 
	
	Videos.find({_id: req.params.id}).lean().exec(function (err, video) {
		if(err){ 
			console.log(err); 
		}else{
			res.type('application/json');
			res.jsonp(video[0]);
			res.end('done');
		}	
	});
};





//
exports.create = function ( req, res ){
  new Videos({
    title    : req.body.title,
    number		: req.body.number,
    description : req.body.description,
    updated_at : Date.now()
  }).save( function( err, person, count ){
    res.redirect( '/videos' );
    res.end('done');
  });
};


// query db for all person items
exports.list = function ( req, res ){
	// get script phase 
	mongoose.model('Scripts').collection.find().toArray(function(err, script) {
  	var phase = script[0]['current_phase']; 
  	// get group of current user
	  mongoose.model('Users').find({ username: req.user.username }).select('groups').setOptions({lean:true}).exec(function ( err, groups ){
	  	var group = groups[0].groups[Number(phase)];  
	  	
			// get video-ids of group
			mongoose.model('Groups').find( { id: group}).select('id videos').setOptions({lean:true}).exec(function ( err, videos ){
				var query = {};
				query['id'] = { $in: videos[0].videos }; // 
				// get videos 
				Videos.find( query ).sort( 'id' ).exec( function ( err, items ){ 
						res.render( 'videos', {
							title : 'Express Videos Example',
							group : group,
							items : items
						});
						res.end('done');
					});
			});// end Groups
		});// end Users
	});// end Scripts				
};


// new 
exports.new_one = function ( req, res ){
		res.render( 'admin-videos-new', {
		  title : 'Express Videos Example',
//		  items : items
		});
		res.end('done');
};

// remove videos item by its id
exports.destroy = function ( req, res ){
  Videos.findById( req.params.id, function ( err, person ){
    person.remove( function ( err, person ){
      res.redirect( '/videos' );
      res.end('done');
    });
  });
};


exports.editMetadata = function ( req, res ){
  Videos.find( function ( err, videos ){
  	res.type('application/json');
			res.jsonp(videos);
			res.end('done');
		/*	
    res.render( 'admin-videos-edit', {
        title   : 'Express Videos Example',
        items   : videos,
        current : req.params.id
    });
    res.end('done');
    */
  });
};


/*
Load popcorn maker to annotatate the requested video
**/
exports.editAnnotations = function ( req, res ){
  Videos.find({ _id: req.params.id}).setOptions({lean:true}).exec(function ( err, videos ){
    res.render( 'popcorn-maker/popcorn-maker', {
        title   : 'Express Videos Example',
        items   : videos,
        current : req.params.id,
        bim: "hello"
    });
    res.end('done');
  });
};




/***/ 
exports.show = function ( req, res ){ 
  Videos.find({ _id: req.params.id}).setOptions({lean:true}).exec(function ( err, video ){
  	if(!err){ 
		  res.render( 'videos-single', {
		      title   : 'Express Videos Example',
		      items   : video,
		      current : req.params.id
		  });
		  res.end('done');
    }else{
				console.log('ERROR: '+err)
			}
  });
};


// redirect to index when finish
exports.update = function ( req, res ){
  Videos.findById( req.params.id, function ( err, video ){ 
    video.metadata[0].title = req.body.title;
    video.video = req.body.video;
    video.metadata[0].author = req.body.author;
    video.metadata[0].abstract = req.body.abstract;
    video.metadata[0].category = req.body.category;
    video.updated_at = Date.now();
    video.save( function ( err, video, count ){
      res.redirect( '/videos' );
      res.end('done');
    });
  });
};



// annotate toc
exports.annotate = function(req, res) {

	console.log('..........................start saving: ')
	var query = {'_id':req.body.videoid};
	var update = {};
	switch(req.body.annotationtype){
		case "toc" : update = { toc: req.body.data}; break;
		case "tags" : update = { tags: req.body.data}; break;
		case "assessment" : update = { assessment: req.body.data}; break;
		case "comments" : update = { comments: req.body.data}; break;
		case "hightlight" : update = { hightlight: req.body.data}; break;
	}
	console.log('start saving: '+req.body.annotationtype +' '+req.body.videoid);
	
	//res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
	Videos.findOneAndUpdate(query, update, function(err, doc){
		  if (err){
		  	console.log('****************** ERROR')
		  	console.log(err);
		  } 
		  console.log('Updated annotation '+req.body.annotationtype+ ' of video '+req.body.id);
		  	
		  	console.log('fin saving: ')
		  	//res.type('application/json');
		  	//res.jsonp({msg:"succesfully saved"});
		  	res.send({"msg":"succesfully saved"});
		  	//res.end("bye")
		  	//res.redirect( '/videos/view/'+req.params.id );
		  	//return res.end();
	});


} 

/*
//
exports.annotateTags = function(req, res) { 
    var videodata = req.body.data; 
    Videos.find({ id:req.params.id}).setOptions({lean:true}).exec(function ( err, video ){
    	if(!err){ console.log()
				video.tags = videodata;
				video.updated_at = Date.now();
				video.save( function ( err, video, count ){
				  //res.redirect( '/videos/view/'+req.params.id );
				});
			}	
  });
}


exports.annotateComments = function(req, res) { 
    var videodata = req.body.data; 
    Videos.findById( req.params.id, function ( err, video ){gr
    	if(!err){ 
				video.comments = videodata;
				video.updated_at = Date.now();
				video.save( function ( err, video, count ){
				  res.redirect( '/videos/view/'+req.params.id );
				});
			}else{
				console.log('ERROR: '+err)
			}	
  });
} 

//
exports.annotateQuestions = function(req, res) { 
    var videodata = req.body.data; 
    Videos.findById( req.params.id, function ( err, video ){
    	if(!err){ 
				video.assessment = videodata;
				video.updated_at = Date.now();
				video.save( function ( err, video, count ){
				  res.redirect( '/videos/view/'+req.params.id );
				});
			}	
  });
} 
*/
//var mongo = require('mongodb');
/*var BSON = mongo.BSONPure;

exports.updateVideoTOC = function(req, res) {
    var id = req.params.id;
    var video = req.body;
    console.log('Updating video: ' + id);
    console.log(JSON.stringify(video));
    //db.collection('videos', function(err, collection) {
        Videos.update({'_id':new BSON.ObjectID(id)}, {$set:{toc:video.data}}, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating video TOC: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(video);
            }
        });
    //});
} 
*/


