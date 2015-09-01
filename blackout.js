// Based on SopaBlackout
// Usage: <script lang="en" src="https://www.occrp.org/freekhadijaismayilova/blackout/blackout?pk_campaign=KhadijaBlackout&pk_kwd=Impression"></script>
// use your language in the lang tag

// doing this before onDomReady to make sure we get the right script tag
var scriptElements = document.getElementsByTagName('script');
var currentScript = scriptElements[scriptElements.length - 1];
try {
    var blackout_language = currentScript.getAttribute('lang').toLowerCase();
} catch(e) {
}

// the magic
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
			HEADER_TEXT1: "Today the Azerbaijani government sentenced Khadija Ismayilova to X years in prison.",
			HEADER_TEXT2: "They believe it will stop her reporting. It will not.",
			READMORE_TEXT: "Find out more",
			CONTINUE_TEXT: "(click anywhere to continue)",
			ARMBAND_TEXT: "FREE KHADIJA"
		},
		"zz": {
			HEADER_TEXT1: "Zlarg, blargh Azerbaijan flesti prodoghafe dusimo X ves kharna.",
			HEADER_TEXT2: "Blerugh zargh aas rmodo asif fleah. Stugh modonigh.",
			READMORE_TEXT: "Flimfloop a bizdang",
			CONTINUE_TEXT: "(zlor drlum fa)",
            ARMBAND_TEXT: "BLAARGH KHADIJA"
		},
        "is": {
            HEADER_TEXT1: "Í dag dæmdi ríkisstjórn Azerbaijans Khadiju Ismayilovu í X ára fangelsisvist.",
            HEADER_TEXT2: "Þau halda að það muni stöðva fréttaflutninginn hennar. Það er rangt.",
            READMORE_TEXT: "Lærðu meira um málið",
            CONTINUE_TEXT: "(smelltu hvar sem er til að halda áfram)",
            ARMBAND_TEXT: "FRELSIÐ KHADIJU" // this has to be really short!
        },
        "pl": {
            HEADER_TEXT1: "Rząd Azerbejdżanu skazał dziś Khadiję Ismayilową na X lat w więzieniu.",
            HEADER_TEXT2: "Ma nadzieję, że to zablokuje jej działalność. Jest w błędzie.",
            READMORE_TEXT: "Dowiedz się więcej",
            CONTINUE_TEXT: "(kliknij gdziekolwiek, by zamknąć)",
            ARMBAND_TEXT: "UWOLNIĆ KHADIJĘ" // this has to be really short!
        },
        "ba": {
            HEADER_TEXT1: "Danas su azerbejdžanske vlasti osudile Hatidžu Ismailovu na X godina zatvora",
            HEADER_TEXT2: "Vjeruju da će to zaustaviti njeno izvještavanje. Neće",
            READMORE_TEXT: "Otkrijte više",
            CONTINUE_TEXT: "(kliknite bilo gdje za dalje)",
            ARMBAND_TEXT: "SLOBODA ZA HATIDŽU"  // this has to be really short!
        },
        "bg": {
            HEADER_TEXT1: "Днес правителството на Азърбайджан осъди Хадиджа Исмаилова на X години затвор",
            HEADER_TEXT2: "Те вярват, че това ще я спре да пише. Няма да стане.",
            READMORE_TEXT: "Научете повече",
            CONTINUE_TEXT: "(кликнете където и да е, за да продължите)",
            ARMBAND_TEXT: "СВОБОДА ЗА ХАДИДЖА"  // this has to be really short!
        },
        "rs": {
            HEADER_TEXT1: "Azerbejdžanske vlasti osudile su danas novinarku Hadidžu Ismailovu na X godina zatvora",
            HEADER_TEXT2: "Veruju da će to da zaustavi njeno izveštavanje – neće",
            READMORE_TEXT: "Otkrijte više",
            CONTINUE_TEXT: "(kliknite bilo gde za dalje)",
            ARMBAND_TEXT: "SLOBODA ZA HADIDŽU"  // this has to be really short!
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
        
        // armband
        var armband = create('div', {
                overflow: 'hidden',
                position: 'fixed',
                fontSize: '11pt',
                lineHeight: '13pt',
                top: '0px',
                right: '0px',
                width: '14em',
                height: '10em',
                zIndex: KhadijaBlackout.ZINDEX - 1,
                background: 'transparent'
            },
            create('a', {
                    background: 'black',
                    display: 'block',
                    position: 'relative',
                    boxShadow: '0px 0px 10px #333',
                    textAlign: 'center',
                    top: '3em',
                    right: '8em',
                    height: 'auto',
                    width: '15em',
                    color: 'white',
                    fontFamily: 'sans-serif',
                    fontSize: '11pt',
                    lineHeight: '13pt',
                    padding: '0.5em 10em',
                    transform: 'rotate(40deg)',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    textDecoration: 'none',
                    boxSizing: 'content-box',
                    zIndex: KhadijaBlackout.ZINDEX - 1,
                    href: "https://www.occrp.org/freekhadijaismayilova/?pk_campaign=KhadijaBlackout&pk_kwd=ArmBand",
                },
                txt(KhadijaBlackout.texts.ARMBAND_TEXT)
            )
        )
        body.appendChild(armband);

        // that's how the cookie crumbles
        // we don't want to do blackout for users that have already seen it
        if (KhadijaBlackout.cookied()) return;
        
        // animation
        var animationstyle = create('style', null, txt("@keyframes appear { 0%, 30% { opacity:0; } 100% {opacity:1; } } @keyframes fadeout { 0%, 30% { opacity:1; } 100% {opacity:0.4; } }"));
        body.appendChild(animationstyle);
        
        // blackout
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
				color: '#ddd'
            },
			create('div', {marginLeft: 'auto', textShadow: "-1px -1px 0px #444", marginRight:'auto', maxWidth: '25em', fontFamily: 'sans-serif', color: '#ddd', fontSize: '20pt', lineHeight: '20pt', opacity: '0.4', animationName: 'fadeout', animationDuration: '6s', animationDelay: '0s'}, txt(KhadijaBlackout.texts.HEADER_TEXT1)),
			create('div', {fontFamily: 'sans-serif', fontSize: "15pt", lineHeight: '15pt', textShadow: "0px 0px 1px white", color: '#fff', paddingTop: '2em', opacity: '1', animationName: 'appear', animationDuration: '6s', animationDelay: '0s' }, txt(KhadijaBlackout.texts.HEADER_TEXT2)),
			create('p', { paddingTop: '0em'},
				create('a', {
					href: "https://www.occrp.org/freekhadijaismayilova/?pk_campaign=KhadijaBlackout&pk_kwd=FindOutMore",
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
    
    KhadijaBlackout.cookied = function() {

        // the cookie name
        var cookieName = 'KhadijaBlackout';
        
        // get all cookies
        var cookies = document.cookie.split(';');
        for (var i=0; i<cookies.length; i++) {
            // cookied? cookied!
            if (cookies[i].trim().indexOf(cookieName + '=') == 0) return true;
        }
        
        // if we're here, we have not found a cookie
        // setting it for a year
        var ctime = new Date();
        ctime.setTime(ctime.getTime() + (365*24*60*60*1000));
        document.cookie = cookieName + '=seen; expires' + ctime.toUTCString();
        // if the cookie is not there, cookies are blocked; do not display the blackout
        if (document.cookie == '') return true;
        // user was not cookied upon arrival (now they are)
        return false;
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
