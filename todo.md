

# Interessenten
holgerschmiedl@yahoo.de


## Next Steps
- refactor frontend by using vue.js

- downloadschutz für video, siehe aclroutes...
- video zoom
- vernünftiges CSS für video-controls
- annotations-classes stärker abstrahieren/ vererben, insb. parser integrierenl
- Zwischenschritt der Datenspeicherung im DOM auslassen, statt dessen verschiedene vi2.database-Schnittstellen definieren.
- redesign of the log files: {video:, command: , value:, ...}
- guided video tour
- show propaganda ... as overlay?
- include pages: videos, scenes, persons....
- bug/firefox: flickering from timeupdate @ vi2.core.videoplayer

- Mehrsprachigkeit, siehe [http://i18next.com/](Ansatz)


- @persons: Idee: Alle Einzelbilder, auf denen die Personen zusehen ist kann man in einer Art Karussell durch brausen. Dabei wird die zeitliche Position der Bilder auf der Zeitleiste anotiert. Siehe: http://ninsuna.elis.ugent.be/Showcase/main.jsp#band
- verschiedene Projekte/Kurse
- Unterseiten via URL referenzieren
- nth: Transkription des Sprechers
- nth:- Hyperlinks zu Lanzmann, Geron, Dreharbeiten
- nth:- Audio aufbereiten
- nth:- Videorestauration
- nth: -- Einzelbilderzugang + gesonderte Einzelbilder
- nth: Zwischenebene für Datenhaltung entfernen
- nth:- widget: time break (für fehlende szenen)
- @scenes: link "Ort" with Map // tooltip
- @scenes: fix scrollspy / affix => its related to the dynamic height of, e.g. scene-view
- @scenes: finish description of scenes

- @Film, widget: classified marks (für kennzeichnung von propaganda-szenen) == Kommentare
- @Film, widget: maps tripple abspielposition sowie x und y auf einer Bilddatei ... alternativ Koordinaten von OSM
- Verlinkung zw. szenen, personen und dem video
- page-up beim seitenwechsel

- @backend: make all editable
- @backend: dashboard
- @backend: popcorn maker
 - einbinden
 - popcorn to vi-two
 - adopt forms
- @backend: let users register and communicate the princple of minimal data collection
- @backend: script editor > json2form



# Maintainance
* compress files, include minified versions
* handle vi-two as a submodule in git hub
* improve admin backend



---------------------------------
!!!- Biografien erarbeiten,
- Zuordnung von Orten
- Zuordnung von Propaganda
- Personen-Tags definieren
- Karte mit Video synchronisieren
- GeoModell
- GeoDaten





---------------------------------
Recherchen zu Personen/Orte/Propaganda je Szene
Film: http://141.46.8.101/beta/interecine/theresienstadt.webm
Biografien: https://etherpad.mozilla.org/VrTMfgOwNR
Szenen/Propaganda: https://etherpad.mozilla.org/Avu9FN3BeQ

Hinweise nach Spiegelartikel:
http://www.spiegel.de/einestages/ss-propagandafilm-theresienstadt-90-minuten-luege-a-1011859.html
- Roman Austerlitz
-  Ernest Seinfeld, heute, 19:16 Uhr
Wie so viel über Theresienstadt ist auch dieser Film mißverstanden. Die Idee daß die Nazis im Juni 1944 einen Propagandafilm herstellten um die Welt zu täuschen macht keinen Sinn. Nicht nur daß die Welt, in diesem Fall die Alliierten, alles schon über den Holocaust wußten, noch bedeutsamer ist daß die Gestapo wußte daß es auch den Alliierten bekannt war (obwohl diese viel der Öffentlichkeit verheimlichten). Die einzige logische Erklärung ist daß dieser Film für Himmlers Zwecke gedreht wurde. Himmler führte seit 1943, also nach Stalingrad, eine zweifache Politik bezüglich Theresienstadt, eine offizielle und eine persönlich. Dafür sind mehrere Indizien vorhanden. Im Kurzen, Theresienstadt hatte einen wichtigen Platz in seinem Plan die Kontrolle ueber Deutschland mit Hilfe gewisser Kreise der Alliierten, die damals nie eine Rolle Hitlers geduldet hätten, zu erlangen. Kreise die bereit sein würden ein Deutschland ohne Hitler eher als ein Bolschewistisches Europa zu akzeptieren. Diese Idee war unter den führenden Nazis weit verbreitet. "Ich erwarte einen telephonischen Anruf der Alliierten jeden Moment", so sagte Göring, e.g. Himmler offensichtlich hoffte daß dieser Film für kurze Zeit als Alibi für diese Kreise dienen würde, sowie auch, obwohl weniger, für ihn. Daß das Ausmaß des Holocausts bald der westlichen Öffentlichkeit bekannt werden mußte und Empörung auslösen würde, war offensichtlich, aber solches wäre zu spät gekommen um dieses Arrangement zu verhindern, da ein Waffenstillstand, bereits in Kraft war. Einer der letzten Äußerungen Himmlers kurz vor dem Ende des Krieges daß "Theresienstadt einer seiner besten Karten" in seinen erhofften Treffen mit den Alliierten sei, ist bloß einer dieser Indizien. Wen nötig ist auch zwei weitere Beispiele da: ein Befehl Himmlers an Kaltenbrunner der einen Transport von 5000 Juden nach Auschwitz im Februar 1943 plante: "An den Chef der Sicherheitspolizei und des SD, Berlin, 'Der Reichsführer SS wünscht die Abtransportierung von Juden aus Theresienstadt nicht, da sonst die Tendenz, daß die Juden im Altersghetto Theresienstadt in Ruhe leben und sterben können, damit gestört würde'" (10. Februar 1943, Tgb. Nr.: 39/75/43g)





RESPONSIVE DESIGN
var screencheck = window.matchMedia("(min-width: 800px)");
if (screencheck.matches) {
<video controls>
<source src="the-sky-is-calling-large.mp4" media="screen and (min-device-width:801px)">
<source src="the-sky-is-calling-large.webm" media="screen and (min-device-width:801px)">
<source src="the-sky-is-calling-small.mp4" media="screen and (max-device-width:800px)">
<source src="the-sky-is-calling-small.webm" media="screen and (max-device-width:800px)">
</video>


Objekterkennung
http://wesbos.com/demos/html5-face-detection/
http://wesbos.com/html5-video-face-detection-canvas-javascript/
http://www.soundstep.com/blog/experiments/jstracking/
http://www.soundstep.com/blog/2012/03/19/javascript-motion-tracking/
http://trackingjs.com/docs.html#trackers
https://github.com/eduardolundgren/tracking-elements#object-tracker
http://techslides.com/demos/video-face/
https://github.com/mtschirs/js-objectdetect/blob/master/examples/example_sunglasses_jquery.htm
http://techslides.com/object-detection-with-html5-getusermedia/
http://gannon.tv/edge_demos/motiontracking/


-------------------------
GEO
------------------------
Anbei habe ich dir knapp 40 Standbilder geschickt. Du kannst ja mal schauen, welche Orte du erkennst und welche davon überhaupt zugänglich sind (Dresden Kaserne?). Ideal wäre jeweils ein Farbfoto aus der gleichen Perspektive. Gegenstände und Personen aus der heutigen Zeit stören dabei nicht - im Gegenteil. Personen sollten jedoch auf Grund möglicher Verletzungen ihrer Persönlichkeitsrechte (u.a. Recht am eigenen Bild) nicht identifizierbar sein. Darüber hinaus hast du alle künstlerischen Freiheiten. 
Zur praktischen Umsetzung ist sicher ein Ausdruck (oder Laptop) hilfreich zum Vergleich der Einstellung. 
Wenn es fünf Fotos werden, wäre es für den Anfang ausreichend. 

Drei Ziele oder Begründungen dazu:
- Drehorte identifizieren
- Gegenüberstellung der baulichen Substanz von heute und damals
- Sammlung von Zeitdokumenten von Terezin 2014


------------------------
Quellen
------------------------
Inzwischen konnten wir uns beim Neißefilmfest "Liga Terezin" ansehen. Im Film wird die Fußballszene des Propagandafilms einschließlich einiger, heute noch lebender Spieler von damals beleuchtet und heutigen antisemitischen Fankulturen gegenübergestellt. Exemplarisch wird Ajax Amsterdam angeführt, die sich selbst (auch aus Tradition) als jüdisch bezeichnen. Ebenso wird Sparta Prag mit rassistisch-antisemitistischen Slogan "Juden Slovaki" angeprangert. 
Der Film könnte für euch sehr interessant sein, um durch den Fußball einen besseren Zugang zu Jugendlichen zu finden. 

Notizen aus dem Film Liga Terezin:
- Die Mannschaften Jugendfürsorge spielte gegen die Kleiderkammer
- Spiel- und Aufnahmetag: 1. September 1944
- Sale Fischermann -- Schuster (weisses Band?)
- Pavel Breda (weisses Band?)
- Dobry, Obed, Milos (Spieler)
- Kurt und Egon Rach
- Zuschauer: Toman Broch (Professor), Honza Burka
Buch: Peter Erban
Simon Copper
Jüdische Fußballmannschaften  Ajax + Tottenham


Herbert Mandl
http://www.boerverlag.de/MANDL-B1.HTM


--------------------------
Script
---------------------------

Eine Gruppe von Lernenden wird in Zweiergruppen aufgeteilt und in die Lernumgebung eingeführt. Diese enthält neben dem/n Video/s ein interaktives Inhalts-, Personen- und Ortsverzeichnis sowie Verknüpfungen zu weiteren Filmischen Ressourcen.  
- In Phase 1 erhalten sie die Aufgabe Szenen im Film zu identifizieren, die 
-- a) stark übertrieben wirken, 
-- b) wo sie das Gefühl haben, dass etwas fehlt bzw. nicht dargestellt wird, 
-- c) die Augen der Personen im Film eine besondere Wirkung haben. Die zeitliche Position von drei solcher Szenen wird markiert und mit eigenen Worten begründet.
- In Phase 2 werden dem Lernenden lediglich die zeitlichen Markierungen ihres Gruppenpartners angezeigt. Sie erhalten die Aufgabe, diese in Bezug auf die Fragestellung in Phase 1 zu beschreiben
- In Phase 3 analysisert die Lernumgebung die am häufigsten kommentierten Szenen. Jene Gruppen, die an der Diskussion dieser Szenen beteiligt waren erläutern allen Lernenden ihre Feststellungen.




{
		"name": "vi-theresienstadt",
		"description": "This application is based on vi-lab as an node.js video learning environment and vi-two as an framework for interactive videos.",
		"version": "0.5.1",
		"private": true,
		"dependencies": {
				"abbrev": "^1.1.1",
				"acl": "*",
				"async": "*",
				"body-parser": "*",
				"canvas": "*",
				"cheerio": "*",
				"connect-flash": "*",
				"cookie-parser": "*",
				"cookies": "*",
				"csv": "*",
				"d3": "*",
				"ejs": "*",
				"ejs-locals": "*",
				"express-json": "*",
				"express-session": "*",
				"express-validator": "*",
				"gauss": "*",
				"geoip-lite": "*",
				"hooks": "*",
				"http-agent": "*",
				"identicon": "*",
				"jquery": "*",
				"jsdom": "*",
				"method-override": "*",
				"mongodb": "*",
				"mongoose": "*",
				"mpath": "0.2.1",
				"mpromise": "0.5.1",
				"mquery": "0.6.0",
				"ms": "0.6.2",
				"muri": "0.3.1",
				"nan": "0.6.0",
				"node": "*",
				"node-csv": "*",
				"node-fs": "*",
				"node-schedule": "*",
				"nopt": "^4.0.1",
				"npm": "*",
				"osenv": "^0.1.4",
				"passport": "*",
				"passport-local": "*",
				"password-hash": "*",
				"path": "*",
				"redis": "0.8.6",
				"regexp-clone": "0.0.1",
				"request": "2.27.0",
				"share": "0.6.3",
				"sliced": "0.0.5",
				"socket.io": "*",
				"socket.io-client": "*",
				"xml2js": "*",
				"xmldom": "*"
		},
		"engines": {
				"node": "0.8.4",
				"npm": "1.1.49"
		},
		"scripts": {
				"start": "node server.js"
		},
		"main": "server.js",
		"devDependencies": {},
		"repository": {
				"type": "git",
				"url": "https://github.com/nise/vi-theresienstadt.git"
		},
		"keywords": [
				"interactive video",
				"video",
				"hypervideo",
				"video learning environment"
		],
		"author": "niels seidel",
		"license": "MIT license",
		"bugs": {
				"url": "https://github.com/nise/vi-theresienstadt/issues"
		}
}
