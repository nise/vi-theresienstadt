
var 
	mongoose = require( 'mongoose' ),
	Scripts  = mongoose.model( 'Scripts' )
	fs = require('node-fs'),
	csv = require('csv')
	;




 /*
 
 **/
 exports.importScript = function(){
 
    var script = 
    {
    	current_phase : 0,
    	slides : true,
    	phases: [
    		{ /* Terezin */
    			title: "Phase 5 - kollaboratives Schreiben",
    			instruction: "Bitte schauen Sie sich das Video an. Sie können dieses wieder taggen und kommentieren. Diskutieren Sie anschließend in Ihrer Gruppe die eingefügte Situationsbeschreibung und erstellen Sie gemeinsam einen fundierten Diagnosebefund mit folgenden Bestandteilen: Konfliktart und -ursache, Streitthemen, Konfliktverlauf, Parteien, Beziehungen zwischen den Parteien, Grundeinstellung zum Konflikt, Konfliktstufe nach Glasl. Ein kleiner Tipp: In der aufgezeigten Situation sind zwei verschiedene Konflikte versteckt! Beide hängen zusammen, sind jedoch getrennt voneinander zu analysieren. <br>Entscheiden Sie anschließend, welche Interventionsform Ihrer Ansicht nach in dem vorliegenden Fall geeignet ist. Dokumentieren Sie Ihre Arbeitsergebnisse in einem <a href='/collaborative-writing2'>kollaborativen Schreibtool</a>. (Gruppenarbeit, 4-6 Personen)",
    			title_k: "Aufgabe 4 - Diskussion & Feedback",
    			instruction_k: "Reflektieren Sie Ihre Ergebnisse auf Basis des bereit gestellten, alternativen Lösungsvorschlags. (Gruppenarbeit, 4-6 Personen)",
    			seq : 4,
    			groupindex: 4, 
    			widgets: [
		  		{ name: 'toc', accordion:true, annotate:false }
		  		,{ name: 'highlight', accordion:true, annotate:false }
		  		,{ name: 'syncMedia', accordion:true, annotate:false }
		  		//{ name: 'tags', accordion:true, annotate:false },
		  			//{ name: 'comments', accordion:true, annotate:true },
		  			//{ name: 'assessment', accordion:false, annotate:false },
		  			//{ name: 'slides' }
		  		]	
    		}
    	]
    };

    Scripts.remove(function(err, o){
    	if(err){
    		console.log(err)
    	}else{
        console.log("Removed script");
        new Scripts(script).save( function( err, todo, count ){
					if(err){
						console.log(err);
					}else{
						console.log("added script");
						//res.redirect( '/users' );
					}
				});;
     	}   
    });
    
    return;
    
    Scripts.insert(script, {safe:true}, function(err, result) {
	  	if(err){
    		console.log(err)
    	}else{
    		console.log("added script");
    	}
    });
	 
};




exports.getScript = function(req, res) {
	Scripts.collection.find().toArray(function(err, items) {
    	res.type('application/json');
		 	var 
				date = new Date(), 
				p = 1;
			if(date.getMonth() == 11){
				switch(date.getDate()){
					case 5: p=0; break;
					case 6: p=0; break;
					case 7: p=0; break;
					case 8: p=1; break;
					case 9: p=1; break;
					case 10: p=2; break;
					case 11: p=2; break;
					case 12: p=3; break;
					default : p = 1;
				}
			}
      //items[0]['current_phase'] = p;
      console.log('PHASE == ' + p);
    	res.jsonp(items);  //items is the object
		});
};




/* 
var schedule = require('node-schedule');
var date = new Date();
console.log(date.getYear()+'--'+date.getMonth()+'--'+date.getDay()+'--'+date.getHours()+':'+date.getMinutes());

 date = new Date(113, 11, 2, 23, 42, 0);
// 113--11--2--23:32

date=new Date();
date.setFullYear(2013,11,3,0,0,0);

var j = schedule.scheduleJob(date, function(){
	//var date = new Date();
	//console.log(date.getYear()+'--'+date.getMonth()+'--'+date.getDay()+'--'+date.getHours()+':'+date.getMinutes());
	console.log('....................The world is going to end today.');
});
*/

//var rule = new schedule.RecurrenceRule(); rule.second = 5;
//var jj = schedule.scheduleJob(rule, function(){
//    console.log('The answer to life, the universe, and everything!');
//});


