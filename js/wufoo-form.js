var z7x3k1;(function(d, t) {
		var s = d.createElement(t), options = {
		'userName':'chrisltd', 
		'formHash':'z7x3k1', 
		'autoResize':true,
		'height':'517',
		'async':true,
		'header':'hide'};
		s.src = ('https:' == d.location.protocol ? 'https://' : 'http://') + 'wufoo.com/scripts/embed/form.js';
		s.onload = s.onreadystatechange = function() {
		var rs = this.readyState; if (rs) if (rs != 'complete') if (rs != 'loaded') return;
		try { z7x3k1 = new WufooForm();z7x3k1.initialize(options);z7x3k1.display(); } catch (e) {}};
		var scr = d.getElementsByTagName(t)[0], par = scr.parentNode; par.insertBefore(s, scr);
		})(document, 'script');