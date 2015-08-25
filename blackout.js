// Based on SopaBlackout
// Usage: <script src="https://www.occrp.org/freekhadijaismayilova/khadija-blackout/blackout.js"></script>
(function (){
	var root = this;

	var KhadijaBlackout = function(){};
	var	addEvent = function(obj, type, fn, ref_obj){
		if (obj.addEventListener){
			obj.addEventListener(type, fn, false);
		}else if (obj.attachEvent){
			obj["e"+type+fn] = fn;
			obj[type+fn] = function(){
				obj["e"+type+fn](window.event,ref_obj);
			};
			obj.attachEvent("on"+type, obj[type+fn]);
		}
	};
	var IEContentLoaded = function(w, fn) {
		var d = w.document, done = false,
		init = function () {
			if (!done) {
				done = true;
				fn();
			}
		};
		(function () {
			try {
				d.documentElement.doScroll('left');
			} catch (e) {
				setTimeout(arguments.callee, 50);
				return;
			}
			init();
		})();
		d.onreadystatechange = function() {
			if (d.readyState == 'complete') {
				d.onreadystatechange = null;
				init();
			}
		};
	}
	var onDomReady = function(fn){
		if (document.addEventListener){
			document.addEventListener('DOMContentLoaded', fn, false);
		}else{
			IEContentLoaded(window, fn);
		}
	};
	var getStyle = function(e, prop){
		if (e.currentStyle){
			return e.currentStyle[prop];
		}else if (document.defaultView && document.defaultView.getComputedStyle){
			return document.defaultView.getComputedStyle(e, "")[prop];
		}else{
			return e.style[prop];
		}
	};
	var findPos = function(obj){
		var curleft = 0;
		var curtop = 0;
		if (obj.offsetParent){
			do{
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			}while(obj = obj.offsetParent);
		}
		return [curleft, curtop];
	};
	var txt = function(s){
		return document.createTextNode(s);
	};
	var create = function(e, props){
		var elem = document.createElement(e);
		var props = props !== null ? props : {};
		for (var key in props){
			if (key == 'href'){
				elem.href = props[key];
			}else{
				elem.style[key] = props[key];
			}
		}
		l = arguments.length;
		for (var i=2; i<l; i++){
			elem.appendChild(arguments[i]);
		}
		return elem;
	};
	var getOpts = function(){
		var ret = {};
		for (var key in KhadijaBlackout.DEFAULTS){
			var k = 'khadijablackout_' + key;
			ret[key] = (typeof window[k] === 'undefined') ? KhadijaBlackout.DEFAULTS[key] : window[k];
		}
		return ret;
	};
	var dateMatches = function(spec){
		spec.push(false); spec.push(false); spec.push(false);
		var today = new Date();
		if ((spec[0] !== false && today.getFullYear() !== spec[0]) ||
				(spec[1] !== false && today.getMonth() + 1 !== spec[1]) ||
				(spec[2] !== false && today.getDate() !== spec[2])){
			return false;
		}
		return true;
	};

	KhadijaBlackout.VERSION = '0.2.0';
	KhadijaBlackout.MIN_HEIGHT = 100;
	KhadijaBlackout.TRANSLATIONS = {
		"en": {
			HEADER_TEXT1: "Today the Azerbaijani government sentenced Khadija Ismayilova to 9 years in prison.",
			HEADER_TEXT2: "They believe it will stop her reporting. It will not.",
			READMORE_TEXT: "Find out more",
			CONTINUE_TEXT: "(click anywhere to continue)",
            ARMBAND_TEXT: "FREE KHADIJA"
		},
		"zz": {
			HEADER_TEXT1: "Zlarg, blargh Azerbaijan flesti prodoghafe dusimo 9 ves kharna.",
			HEADER_TEXT2: "Blerugh zargh aas rmodo asif fleah. Stugh modonigh.",
			READMORE_TEXT: "Flimfloop a bizdang",
			CONTINUE_TEXT: "(zlor drlum fa)",
            ARMBAND_TEXT: "BLAARGH KHADIJA"
		}
	}
	if (typeof blackout_language === 'undefined') {
		blackout_language = "en"
	}
	if (!(blackout_language in KhadijaBlackout.TRANSLATIONS)) {
		blackout_language = "en"
	}
	KhadijaBlackout.texts = KhadijaBlackout.TRANSLATIONS[blackout_language];
	KhadijaBlackout.ZINDEX = Math.pow(2, 31) - 2;
	KhadijaBlackout.DEFAULTS = {
		'id': false,
		'srsbzns': false,
		'on': false
	};
	KhadijaBlackout.blackout = function(opts){
		var obj;
		var body = document.body;
		if (opts['id'] === false){
			obj = body;
			height = "100%";
		}else{
			obj = document.getElementById(opts['id']);
			var height = parseInt(getStyle(obj, 'height'), 10);
			height = height > KhadijaBlackout.MIN_HEIGHT ? height : KhadijaBlackout.MIN_HEIGHT;
		}
		var offsets = findPos(obj);

		var animationstyle = create('style', null, txt("@keyframes appear { 0%, 30% { opacity:0; } 100% {opacity:1; } } @keyframes fadeout { 0%, 30% { opacity:1; } 100% {opacity:0.4; } }"));
        body.appendChild(animationstyle);
        
        var armband = create('a', {
                background: 'black',
                position: 'absolute',
                boxShadow: '0px 0px 10px black',
                textAlign: 'center',
                top: '3em',
                right: '-6em',
                height: 'auto',
                width: '15em',
                color: 'white',
                fontFamily: 'sans-serif',
                padding: '0.5em 3em',
                transform: 'rotate(40deg)',
                fontWeight: 'bold',
                letterSpacing: '1px',
                textDecoration: 'none',
                zIndex: KhadijaBlackout.ZINDEX - 1,
                href: "https://www.occrp.org/freekhadijaismayilova/?pk_campaign=BlackOut&pk_kwd=ArmBand",
            },
            txt(KhadijaBlackout.texts.ARMBAND_TEXT)
        )
        body.appendChild(armband);

		var blackout = create('div', {
				fontFamily: 'sans-serif',
				position: 'fixed',
				top: offsets[1],
                left: '0px',
				width: '100%',
				backgroundColor: 'black',
				textAlign: 'center',
				paddingTop: '10%',
				zIndex: KhadijaBlackout.ZINDEX,
				height: height,
				color: '#ddd'},
			create('h1', {marginLeft: 'auto', textShadow: "-1px -1px 0px #444", marginRight:'auto', maxWidth: '25em', fontFamily: 'sans-serif', color: '#ddd', fontSize: '20pt', opacity: '0.4', animationName: 'fadeout', animationDuration: '6s', animationDelay: '0s'}, txt(KhadijaBlackout.texts.HEADER_TEXT1)),
			create('h2', {fontFamily: 'sans-serif', fontSize: "15pt", textShadow: "0px 0px 1px white", color: '#fff', paddingTop: '2em', opacity: '1', animationName: 'appear', animationDuration: '6s', animationDelay: '0s' }, txt(KhadijaBlackout.texts.HEADER_TEXT2)),
			create('p', { paddingTop: '0em'},
				create('a', {
					href: "https://www.occrp.org/freekhadijaismayilova/?pk_campaign=BlackOut&pk_kwd=FindOutMore",
					fontSize: '15pt',
					color: '#aaf',
                    opacity: '1',
                    animationName: 'appear',
                    animationDuration: '9s', animationDelay: '0s'
				}, txt(KhadijaBlackout.texts.READMORE_TEXT)))
		);
		if (opts['srsbzns'] !== true){
			blackout.appendChild(create('p', {position: 'fixed', bottom: '1em', width: '100%', textAlign: 'center', fontFamily: "sans-serif", fontStyle: 'italic', color: '#fff', fontSize: '12pt'}, txt(KhadijaBlackout.texts.CONTINUE_TEXT)));
			addEvent(blackout, 'click', function(e){
				body.removeChild(blackout);
			});
		}
		body.appendChild(blackout);
	};
	KhadijaBlackout.go = function(){
		var opts = getOpts();
		if (opts['on'] !== false && !dateMatches(opts['on'])){
			return;
		}
		KhadijaBlackout.blackout(opts);
	};

	onDomReady(KhadijaBlackout.go);
}).call(this);
