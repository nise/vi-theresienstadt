/* 	PARSER
		author: niels.seidel@nise81.com

	- separate widget-code 
	- show code box
	- inherit sub parser from Parser
	- write complex testing function
	- apply standard TTML: http://www.w3.org/TR/2010/REC-ttaf1-dfxp-20101118/#example
*/



var Parser = $.inherit(/** @lends Parser# */
	{
			/** 
			*		@constructs 
			*		@param {Selector} selector Indicates the DOM selector that contains markup code to be parsed
			*		@param {String} type Defines which markup, 'wiki' or 'html', is going to be parsed
			
			*/
  		__constructor : function(selector, type) {
  			this.selector = selector;
  			this.type = type;
  			//this.run();
  		},
  		
			vid_arr : [],
			selector : '',
			
			/* ... */
			run : function(){
				switch(this.type){
					case 'wiki' :
						return this.parseWiki();
					case 'html' :
						return this.parseHtml();
				}
			},	
			
			/* ... */
			parseWiki : function(){ 
				var _this = this;
			  var v_id = -1;
			  // dirty hack for mediawiki xxx
			  $(this.selector).val($(this.selector).val().replace(/\<p\>/, ''));
				// go through markup lines
  			$($(this.selector+' > p').text().split(/\n/)).each(function(i, val){ 
  				if(val.substr(0,8) == "[[Video:" || val.substr(0,8) == "[[video:"){ 
						// parse videos to sequence
						v_id++; 	  				  		
  					_this.vid_arr[v_id] = _this.parseWikiVideo(val);
	  				}else if(val.substr(0,2) == "[["){
	  				// parse hyperlinks related to the latter video 
  					_this.vid_arr[v_id]['annotation'].push(_this.parseWikiHyperlink(val)); //alert('ok_'+val);  					
  				}else{
  					//alert('bug_'+val);
  				}
  			}); 			
				return this.vid_arr;  			
			},
			
			/* ... */
			parseHtml : function(){ 
				var _this = this;
			  var v_id = -1;
			  var arr = [];
			  var obj = {};
  			$('div'+this.selector+' div').each(function(i, val){ 
  				if($(this).attr('type') == "video"){ 
  					// video
  					arr = [];
  					arr['id'] = $(this).attr('id'); 
  					arr['url'] = $(this).text();
  					arr['seek'] = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
  					arr['duration'] = $(this).attr('duration') == undefined ? 0 : $(this).attr('duration');
  					arr['annotation'] = [];
						v_id++; 
  					_this.vid_arr[v_id] = arr; 
  					
  				}else if($(this).attr('type') == "xlink"){ 
  					// standard and external links
  					obj = {};
						obj.title = $(this).attr('id');
						obj.target = $(this).text();
						obj.linktype = 'standard';
						obj.type = 'xlink';
						obj.x = $(this).attr('posx');
						obj.y = $(this).attr('posy');
						obj.t1 = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.t2 = $(this).attr('duration') == undefined ? 0 : $(this).attr('duration');
						obj.seek = $(this).attr('seek')
						obj.duration = $(this).attr('duration2')
  				
						// distinguish link types
						if(obj.target.match(/(^http:)/)){ obj.linktype = 'external'; } // external link
  					
  					
  					_this.vid_arr[v_id]['annotation'].push(obj);
  					
  				}else if($(this).attr('type') == "cycle"){ 
  					// 
  					obj = {};
						obj.title = $(this).attr('id');
						obj.target = $(this).text();
						obj.linktype = 'cycle';
						obj.type = 'xlink';
						obj.x = $(this).attr('posx');
						obj.y = $(this).attr('posy');
						obj.t1 = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.t2 = $(this).attr('duration') == undefined ? 0 : $(this).attr('duration'); 
						obj.seek = $(this).attr('seek')
						obj.duration = $(this).attr('duration2')
  					_this.vid_arr[v_id]['annotation'].push(obj);
  					
  					 			
  				}else if($(this).attr('type') == "syncMedia"){
  					// sequential media such as pictures
  					obj = {};
						obj.title = $(this).text();
						obj.target = $(this).attr('path');
						obj.linktype = '';
						obj.type = 'syncMedia';
						obj.x = 0;
						obj.y = 0;
						obj.t1 = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.t2 = $(this).attr('duration') == undefined ? 0 : $(this).attr('duration');
  					_this.vid_arr[v_id]['annotation'].push(obj);
  					
					}else if($(this).attr('type') == "map"){
  					// sequential media such as pictures
  					obj = {};
						obj.title = '';
						obj.target = $(this).text();
						obj.linktype = '';
						obj.type = 'map';
						obj.x = 0;
						obj.y = 0;
						obj.t1 = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.t2 = $(this).attr('duration') == undefined ? 0 : $(this).attr('duration');
  					_this.vid_arr[v_id]['annotation'].push(obj);
  			
					}else if($(this).attr('type') == "toc"){
						// table of content references
						obj = {};
						obj.title = $(this).text();
						obj.target = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.linktype = '';
						obj.type = 'toc';
						obj.note = $(this).attr('note');
						obj.x = 0;
						obj.y = 0;
						obj.t1 = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.t2 = 1;// default // $(this).attr('duration') == undefined ? 1 : $(this).attr('duration');
  					_this.vid_arr[v_id]['annotation'].push(obj);
  					
					}else if($(this).attr('type') == "tags"){
						// temporal tags
						obj = {};
						obj.title = $(this).text();
						obj.target = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.linktype = '';
						obj.type = 'tags';
						obj.x = $(this).attr('posx');
						obj.y = $(this).attr('posy');
						obj.t1 = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.t2 = $(this).attr('duration') == undefined ? 0 : $(this).attr('duration');
						_this.vid_arr[v_id]['annotation'].push(obj);
	
					}else if($(this).attr('type') == "highlight"){
						// hight
						obj = {};
						obj.title = $(this).text();
						obj.target = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.linktype = '';
						obj.type = 'highlight';
						obj.x = $(this).attr('posx');
						obj.y = $(this).attr('posy');
						obj.t1 = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.t2 = $(this).attr('duration') == undefined ? 0 : $(this).attr('duration');
						_this.vid_arr[v_id]['annotation'].push(obj);

					}else if($(this).attr('type') == "comments"){ 
						// comments
						obj = {};
						obj.title = $(this).text();
						obj.author = $(this).attr('author');
						obj.date = $(this).attr('date');
						obj.target = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.linktype = '';
						obj.type = 'comment';
						obj.x = 0;
						obj.y = 0;
						obj.t1 = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.t2 = 1;// default // $(this).attr('duration') == undefined ? 1 : $(this).attr('duration');
  					_this.vid_arr[v_id]['annotation'].push(obj);
  					
					}else if($(this).attr('type') == "assessment"){ 
						// assessment
						obj = {};
						obj.title = encodeURIComponent( $(this).text() );
						obj.author = $(this).attr('author');
						obj.date = $(this).attr('date');
						obj.target = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.linktype = '';
						obj.type = 'assessment';
						obj.x = 0;
						obj.y = 0; 
						obj.t1 = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime'); 
						obj.t2 = 1;// default // $(this).attr('duration') == undefined ? 1 : $(this).attr('duration');
  					_this.vid_arr[v_id]['annotation'].push(obj);
  					
					}else if($(this).attr('type') == "assessment-fill-in"){ 
  					// standard and external links
  					obj = {};
						obj.title = $(this).attr('id');
						obj.target = $(this).text();
						obj.linktype = 'standard';
						obj.author = $(this).attr('author') == undefined ? '' : $(this).attr('author');
						obj.width = $(this).attr('width') == undefined ? 100 : $(this).attr('width');
						obj.type = 'assessment-fill-in';
						obj.x = $(this).attr('posx');
						obj.y = $(this).attr('posy');
						obj.t1 = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.t2 = $(this).attr('duration') == undefined ? 0 : $(this).attr('duration');
						obj.seek = $(this).attr('seek')
						obj.duration = $(this).attr('duration2')
  					_this.vid_arr[v_id]['annotation'].push(obj);
  				
  				}else if($(this).attr('type') == "assessment-writing"){ 
  					// standard and external links
  					obj = {}; 
						obj.title = encodeURIComponent( $(this).text() );//$(this).attr('id');
						obj.target = $(this).text();
						obj.linktype = 'standard';
						obj.author = $(this).attr('author') == undefined ? '' : $(this).attr('author');
						obj.width = $(this).attr('width') == undefined ? 100 : $(this).attr('width');
						obj.type = 'assessment-writing';
						obj.x = $(this).attr('posx');
						obj.y = $(this).attr('posy');
						obj.t1 = $(this).attr('starttime') == undefined ? 0 : $(this).attr('starttime');
						obj.t2 = $(this).attr('duration') == undefined ? 0 : $(this).attr('duration');
						obj.seek = $(this).attr('seek')
						obj.duration = $(this).attr('duration2')
  					_this.vid_arr[v_id]['annotation'].push(obj);
  				}
  				
  			});  		
				return this.vid_arr; 	
			},
  		
  		/* ... */ // all of that is quick & dirty and needs further testing / testing procedures
  		parseWikiVideo : function(str){

					var arr = [];
					var url, start, duration, id = '_';
  				str = str
  					.replace(/^\[\[Video:/, '') // start delimiter
  					.replace(/\]\]/, '') // end delimiter
  					.replace(/\# /, ' #') // start-time
  					.replace(/\| /, ' |') // duration
  					.replace(/  /, ' '); // double spaces
  				var a = str.split(/ /);
  				$.each(a, function(i, val){
  					if(val.substr(0,1) == '#'){ start = val.substr(1,val.length); }
  					else if(val.substr(0,1) == '|'){ duration = val.substr(1,val.length); }
  					else if(val.match(/(?=.ogg)/)){ url = val; }
  					else if(val.length > 0){ id = val; }
  				})
  				//alert('   url:'+url +' start:'+ start +'  duration:'+ duration +'  id:'+ id);
  				// build arr
  				arr['id'] = id;
  				arr['url'] = url;
  				arr['seek'] = start == undefined ? 0 : start;
  				arr['duration'] = duration == undefined ? 0 : duration;
  				arr['annotation'] = [];
  			return arr;
  		},
  		
  		/* ... */
  		parseWikiHyperlink : function(str){ 
  				var _this = this;
  				var re = "";
  				var tmp = '';
  				var obj = {};
  				obj.type = 'xlink';
  				obj.linktype = 'standard';
  	
  				// link types // ?=.ogg | ?=.ogv | 
  				re = new RegExp(/^\[\[http:\/\//);
					if(str.match(re)){ 
						// external link
  					re = new RegExp(/\[\[http:\/\/[a-z A-Z 0-9 \#\ \_\/:.-]+/);
  					tmp = (new String(re.exec(str))).split(" ");
						obj.target = tmp[0].replace(/^\[\[/,'');
						obj.title = tmp.length >= 2 ? tmp.slice(1) : tmp[0].replace(/^[\[\[http:\/\/]/, '');
						obj.title = (new String(obj.title)).replace(/,/g,' ');
  					//alert(obj.target+' - '+obj.title);
						obj.linktype = 'external'; 
					}else{
						// standard links
  					re = new RegExp(/\[\[[a-z A-Z 0-9 \# \ \_\/\|:.-]+/);
  					tmp = (new String(re.exec(str))).split(/\|/);
						obj.target = tmp[0].replace(/^\[\[/,'');
						obj.title = tmp.length >= 2 ? tmp[1] : tmp[0].replace(/^\[\[/,'');
  					//alert(obj.target+' - '+obj.title);
					}
					//alert(obj.target +'  '+ obj.linktype);						
  				//alert(tmp.length+'  '+obj.title);
  		
					// strip start time and duration
					var str2 = str.split(/\]/);
					re = new RegExp(/[\ ]\#[0-9]+/);  				
  				obj.t1 = str.match(re) ? (new String(re.exec(str2[1]))).replace(/[\#]/, '') : 0; // .replace(/|\ /,'')
					re = new RegExp(/[\ ]\|[0-9]+/);  				
  				obj.t2 = str.match(re) ? (new String(re.exec(str2[1]))).replace(/[\|]/, '') : 1000;
//					alert(obj.t1+' - '+obj.t2);
					
					// relative width/height: 50% 20%
					re = new RegExp(/[\ ]+[0-9]{2}(?=\%)/g);
					tmp = str.match(re) ? new String(str.match(re)).split(/,/) : [50,50];
					obj.x = tmp[0] ? tmp[0] : 50;
					obj.y = tmp[1] ? tmp[1] : 50;			
					//alert(''+obj.x+' - '+obj.y+'   time: '+obj.t1+' - '+obj.t2);
					
					 return obj;
  		}

  });
	
