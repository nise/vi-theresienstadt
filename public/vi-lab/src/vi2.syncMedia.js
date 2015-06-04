/* SyncMedia  pdf3JPG:$ convert -resize 800 -quality 93 xxx.pdf slide.jpg
	author: niels.seidel@nise81.com
	
	nth:
	- showOnTimeline: viz on timeline by showing current slide
	- on/off controls .. sync, skip/browse slides
	- differ media types

	*/


	/* class SyncMedia **/ 
	var Vi2_SyncMedia = $.inherit(Annotation, /** @lends SyncMedia# */{

		/** @constructs 
		*		@extends Annotation 
		*		@param {object} options An object containing the parameters
		*/
  	__constructor : function(options) { 
  			this.options = $.extend(this.options, options);
  			
  	},
  	
  	/* Vars */
		name : 'syncMedia',
		type : 'annotation',
		// defaults
		options : {
			selector: '#syncMedia', 
			vizOnTimeline: true, 
			controls: true, 
			showOnTimeline: false,
			showOnMenu: true,
			path: '', 
			sync: false, 
			placeholder:'/vi-lab/img/placeholder.jpg'},
		player : null,
		tag_obj : [],
		currImgId : -1,
		timelineSelector : 'div.vi2-video-seek',
		width : 0,
		height : 0, 
		o : null,	
		
		
		/* Initialize */
		init : function(ann){  	
  		var _this = this; 
			this.tag_obj = [];
			$.each(ann, function(i, val){  
				if(val.type == 'syncMedia'){ 
					var ii = _this.get_tag_by_name(val.title);
					if( ii == -1){ 
						_this.tag_obj.push({
							tagname: val.title, 
							path: val.target,
							occ: [{start: val.t1, duration: val.t2, xpos:val.x, ypos:val.y}]});
					}	else {
					_this.tag_obj[ii].occ.push({start: val.t1, duration: val.t2, x:val.x, y:val.y});
					}
				}
 			});
  	
  		// place holder
  		$(this.options.selector).html(new Image()).addClass(this.options.childtheme);;
  		this.currImgId = -1;
			var o = new Image(); 
			$(o)
				.attr('src', this.options.placeholder)
				.addClass('slide')
				.unbind('click')
				.appendTo(this.options.selector);
  	
			// handle special options
			if( this.options.showOnTimeline ){ this.showTimelineSeq(e);	}
			if( this.options.showOnMenu )	{ this.createMenu(); }
		},
		
		/** ... */
		createMenu : function(){  
			$(this.options.selector).empty();
			var _this = this;
			// template for displaying tags
			
			// prepare list and append existing tags
			var ul = $("<ul></ul>").addClass("highlight-list").appendTo(this.options.selector);   
			$.each(this.tag_obj, function(i, val){ 
				var li = $('<li></li>')
					.addClass('list-item')
					.attr('id', val.tagname.replace(' ', '--'))
					.append($('<a></a>')
					.attr('freq', val.occ.length )
					.addClass('id-'+val.tagname.replace(' ', '--'))
					.text(val.tagname+' ')//+'('+val.occ.length+') ')
					.css("font-size", (val.occ.length / 10 < 1) ? val.occ.length / 10 + 1 + "em": (val.occ.length / 10 > 2) ? "2em" : _freq / 10 + "em")
					.bind('click', {tags: val }, function(e){ 
						// navigate playback time
						vi2.observer.player.currentTime( val.occ[0].start );
						vi2.observer.player.pause();
						$('#video1').addClass('split');
						$('.highlight-element').remove();
						// load image
						var o = new Image(); 
				 		$(o)
							.attr('src', val.path )
							.addClass('slide ov-')
							.unbind('load')
							.bind('load', function(e){ //alert(JSON.stringify(t))
								$('#seq').find('.helper').remove();
								var helper = $('<div></div>')
									.addClass('helper')
									.append(o)
									.appendTo('#seq');
							});
							// return to initial presentation mode
							
							// log something
							vi2.observer.log('clicktagfromlist:'+ val.tagname ); 
					})
				).appendTo( ul ); 
			});
			$( vi2.observer.player ).on('player.play', function(e){ //alert()
				$('#video1').removeClass('split');
				$('#seq').find('.helper').remove();
			});
			// sort by occurence or alphabeticly, sort order desc / asc
			var sortAttr = {};
			sortAttr.attr = this.options.sort == 'freq' ? 'freq' : '';
			sortAttr.order = this.options.order == 'desc' ? "desc" : "asc";
			ul.find('a').tsort(sortAttr); 
			// cut off elements above max and render them
			$(ul).find('li:gt('+(this.options.max-1)+') > a').hide();
			
		},			
		
		/* -- */
		// <div type="syncMedia" starttime=1344 duration=165 id=hello>hydro_graefe-11.jpg</div>
		appendToDOM : function(id){ 
			$(vi2.dom).find('[type="syncMedia"]').each(function(i,val){ $(this).remove(); });
			$.each(	vi2.db.getSlidesById(id), function(i, val){  
				var slides = $('<div></div>')
				.attr('type',"syncMedia")
				.attr('starttime', this.occ[0].start )
				.attr('duration', this.occ[0].duration)
				//.attr('seek', this.seek != null ? deci2seconds(this.seek) : 0)
				//.attr('duration2', this.duration2 != null ? this.duration2 : 0)
				.attr('id', this.id)
				.attr('path', this.path )
				.text(this.tagname )
				.appendTo( vi2.dom );
			}); 
			
		},

		/* -- */
		begin : function(e, id, obj){
			if( this.options.sync ){
				this.placeMedia( e, id, obj )
			} 
		},

	
		/*
		begin : function(e, id, obj){ 
			if(this.currImgId == obj.content.target){
				return false;
			}else{
				this.currImgId = obj.content.target;
				var _this = this; 
				var o = new Image();
				o.src = this.options.path+''+obj.content.target; 
				$(o).addClass('slide');// ov-'+id);
							
  	  	$(this.options.selector+' img').fadeOut(20, function(){ 
  	  	  $(_this.options.selector).html(o);
  	  		$(o).fadeIn(500);
  	  	});
			}
		},
		*/
		
		
		/* ... */
		end : function(e, id){  //alert(id)
			$(this.options.selector+' .ov-'+id).remove();
		},
		
		/* ... */
		showTimelineSeq : function(e){ return;
			var _this= this; 
			if(e.tags.occ.length === 1){
				// jump to temporal position 
				this.player.currentTime(e.tags[0].start);
			}else{
				// display tag occurence on timeline to motivate further selection
				var f = function(_left, _name){
					return $('<span></span>')
						.addClass('timetag ttoc')
						.attr('style','left:'+_left+'px;');
						/*.bind('mouseover', function(){
							...tooltip  _name
						});*/
				};
				/*
				var position = $(_this.timelineSelector).position(); 
        var sliderWidth = $(_this.timelineSelector).width();
        var minX = position.left;
        var maxX = minX + sliderWidth;
        tickSize = sliderWidth / observer.player.duration();
        
				$(_this.timelineSelector).bind('mousemove', function(e){ 
					if (e.pageX >= minX && e.pageX <= maxX) {
        	  var val = (e.pageX - minX) / tickSize;
//            alert(tickSize);

        	}

				});
				*/
				//				
				$.each(e.tags.occ, function(){ 
					var progress = this / _this.player.duration();
					progress = ((progress) * $(_this.timelineSelector).width());
  	    	if (isNaN(progress) || progress > $(_this.timelineSelector).width()) { return;}
	 				$(_this.timelineSelector).append(f(progress, e.tags.name));
 				});
			}
		},
		
		
		/* */
		placeMedia: function( e, id, obj ){
			if(this.currImgId == obj.content.target){
				return false;
			}else{  
				var _this = this;
				this.currImgId = obj.content.target; 
				var o = new Image(); 
				 
				// animate transition	if image is loaded				
				$(o)
					.attr('src', this.options.path+''+obj.content.target)
					.addClass('slide ov-'+id)
					.unbind('load')
					.bind('load', function(e){ //alert(JSON.stringify(t))
							$(_this.options.selector).html(o);
					});
			}
		},	
		
		/** -- */
		get_tag_by_name : function(name){
			var out = -1;
			$.each(this.tag_obj, function(i, val){
				if(val.tagname == name){
					out = i;
				} 
			});
			return out;
		},	
				
		
		/* ... */
		relativePos : function(obj){
			return {x: Math.floor((obj.x/100)*this.player.width()), y: Math.floor((obj.y/100)*this.player.height())};
		},
		
		/* ... */
		loadVideo : function(url, seek){
				this.player.loadVideo(url, seek);  			
		},
		
		width : function(){ return this.width; },
		height : function(){ return this.height; }
			
  	
	}); // end class SyncMedia


