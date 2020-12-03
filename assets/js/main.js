const init = (runCb) => {
	const scripts = document.getElementsByTagName('script');
	const myCfg = cfg[scripts[scripts.length - 1].dataset.index];
	const payload = document.querySelector('.payload');

	// List item for task (each task has its own li element)
	const payloadItem = document.createElement('li');
	payloadItem.id = myCfg.key;

	// Head element with Header and Links to Task and Code
	const payloadHead = document.createElement('div');
	payloadHead.className = 'head';
	payloadHead.innerHTML = '<h1>' + myCfg.label + '</h1><p><a href="' + myCfg.taskURL + '">Task Description.</a><br><a href="https://github.com/davedavedavedavedavedave/adventofcode2020/blob/master/assets/js/' + myCfg.key + '.js">Source Code for this Task.</a></p>';

	// Task Inputs
	const inputs = [];
	for (let i = 0; i < (myCfg.inputs || []).length; i++) {
		let label = document.createElement('label');
		label.innerHTML = 'Task Input:';
		label.appendChild(document.createElement('br'));
		let textarea = document.createElement('textarea');
		textarea.name = myCfg.key + '-' + i;
		label.appendChild(textarea);
		payloadHead.appendChild(label);
		switch (myCfg.inputs[i].type) {
			case 'fetch':
				fetch(myCfg.inputs[i].url).then(resp => resp.text()).then(txt => textarea.value = txt);
				break;
		}
		inputs.push(textarea);
	}

	// Task Run Button. Triggers code execution.
	const runBtn = document.createElement('button');
	runBtn.className = 'Run';
	runBtn.innerHTML = 'Run';
	runBtn.addEventListener('click', e => {
		payloadBody.innerHTML = '<hr>';
		runCb.apply(runCb, inputs.map(input => input.value).concat([result => payloadBody.appendChild(result)]));
	});
	payloadHead.appendChild(runBtn);

	// Task Body, will contain content returned from callback
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

