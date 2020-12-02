(function () {
	// read config of available tasks
	const cfg = [{
		"label": "Day 1 - Part 1",
		"key": "d1p1"
	}, {
		"label": "Day 1 - Part 2",
		"key": "d1p2"
	}];

	// create navigation and content nodes
	const linkList = document.createElement('ol');
	linkList.className = 'linkList';
	document.body.appendChild(linkList);

	const payload = document.createElement('ol');
	payload.className = 'payload';
	document.body.appendChild(payload);
	
	let add = (i) => {
		linkList.innerHTML += '<li><a href="#' + cfg[i].key + '">' + cfg[i].label + '</a></li>';
		payload.innerHTML += '<li id="' + cfg[i].key + '"></li>';
		let script = document.createElement('script');
		script.src = 'assets/js/' + cfg[i].key + '.js';
		script.dataset.key = cfg[i].key;
		if (i + 1 < cfg.length) {
			script.addEventListener('load', () => { add(i + 1) });
		}
		document.body.appendChild(script);
	}
	add(0);
})();

function init() {
	let scripts = document.getElementsByTagName('script');
	return scripts[scripts.length - 1].dataset.key;
}
