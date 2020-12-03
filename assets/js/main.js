const init = (runCb) => {
	const scripts = document.getElementsByTagName('script');
	const myCfg = cfg[scripts[scripts.length - 1].dataset.index];
	const payload = document.querySelector('.payload');
	const payloadItem = document.createElement('li');
	payloadItem.id = myCfg.key;
	const payloadHead = document.createElement('div');
	payloadHead.className = 'head';
	payloadHead.innerHTML = '<h1>' + myCfg.label + '</h1>';
	const inputs = [];
	for (let i = 0; i < (myCfg.inputs || []).length; i++) {
		let textarea = document.createElement('textarea');
		textarea.name = myCfg.key + '-' + i;
		payloadHead.appendChild(textarea);
		switch (myCfg.inputs[i].type) {
			case 'fetch':
				fetch(myCfg.inputs[i].url).then(resp => resp.text()).then(txt => textarea.value = txt);
				break;
		}
		inputs.push(textarea);
	}
	const runBtn = document.createElement('button');
	runBtn.innerHTML = 'Run';
	runBtn.addEventListener('click', e => {
		payloadBody.innerHTML = '';
		runCb.apply(runCb, inputs.map(input => input.value).concat([result => payloadBody.appendChild(result)]));
	});
	payloadHead.appendChild(runBtn);
	const payloadBody = document.createElement('div');
	payloadBody.className = 'body';

	payloadItem.appendChild(payloadHead);
	payloadItem.appendChild(payloadBody);
	payload.appendChild(payloadItem);
}

let cfg = [];

(function () {
	// create navigation and content nodes
	const linkList = document.createElement('ol');
	linkList.className = 'linkList';
	document.body.appendChild(linkList);

	const payload = document.createElement('ol');
	payload.className = 'payload';
	document.body.appendChild(payload);

	// read config of available tasks
	fetch('assets/tasks.json').then(resp => resp.json()).then(loadedCfg => {
		cfg = loadedCfg;
		// have to make sure to add scripts sequentially to be able to get "key" within the script.
		const add = (i) => {
			linkList.innerHTML += '<li><a href="#' + cfg[i].key + '">' + cfg[i].label + '</a></li>';
			let script = document.createElement('script');
			script.src = 'assets/js/' + cfg[i].key + '.js';
			script.dataset.index = i;
			if (i + 1 < cfg.length) {
				script.addEventListener('load', () => { add(i + 1) });
			} else {
				// for whatever reason my firefox didn't show the :target element, unless I specifically set the location hash again ...
				script.addEventListener('load', () => { location.hash = location.hash });
			}
			document.body.appendChild(script);
		}
		add(0);
	})
})();

