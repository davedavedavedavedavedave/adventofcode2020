init((input, cb) => {
	const validEntries = input.split('\n').filter(val => val.length > 0)
		.map(val => val.replace(/^(\d+)-(\d+) (.+): (.*)$/, '$1\n$2\n$3\n$4').split('\n'))
		.filter(val => {
			const occurances = val[3].replace(new RegExp('[^' + val[2] + ']', 'g'), '').length;
			return occurances >= val[0] && occurances <= val[1];
		});
	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + validEntries.length;
	cb(resultEl);
	return;
});
