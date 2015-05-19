# Set the source directory
srcdir = ../../src/

# Create the list of modules
modules =   js/vi2.core.observer.js\
						js/vi2.core.database.js\
						js/vi2.core.parser.js\
						js/vi2.core.videoplayer.js\
						js/vi2.core.clock.js\
						js/vi2.core.utils.js\
						js/vi2.core.log.js\
						js/vi2.core.api.js\
						js/vi2.core.annotation.js\
						js/vi2.syncMedia.js\
						js/vi2.tags.js\
						js/vi2.toc.js\
						js/vi2.xlink.js\
						js/vi2.comments.js\
						js/vi2.assessment.js\
						js/vi2.metadata.js\
						js/vi2.search.js\
						js/vi2.playlist.js\
						js/vi2.relatedVideos.js\
						js/vi2.videoManager.js
						
#						js/vi-videolab.js
						 

#	js/vi2.utils.maintanance.js\
           
deps =   ${srcdir}jquery.inherit-1.1.1.js\
						${srcdir}jquery.json-2.2.min.js\
            ${srcdir}jquery.tinysort.js\
            ${srcdir}jquery.tooltip.js\
 						${srcdir}jquery.spin.js\
            ${srcdir}jquery-jtemplates.js

styles = css/ui-lightness/jquery-ui-1.7.2.custom.css\
	css/jquery.hrzAccordion.defaults.css\
	css/vi2.main.css\
	css/vi2.videoplayer.css\
	css/videolab.css           
            
                      
                      # 						${srcdir}vi2.utils.maintanance.js\
                      #//${srcdir}jquery-ui-1.8.6.custom.js\
                      #${srcdir}jquery.piemenu.js\
# 						${srcdir}jquery.tag-it.js\
           
# Bundle all of the modules into vi-two.js
bundle: ${modules}
		cat $^ > js/vi-two.js

#
deps: ${deps}
	cat $^ > js/vi-two-deps.js

#	Compress al of the modules into vi-two.js
compress: ${modules}
		cat $^ > js/vi-two.js
	  java -jar /usr/bin/compiler.jar --js js/vi-two.js --js_output_file js/vi-two.min.js



# CSS
style: ${styles}
		cat $^ > css/vi-two-style.css


#
bam: $(modules)
		ls

