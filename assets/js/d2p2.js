init((input, cb) => {
	const validEntries = input.split('\n').filter(val => val.length > 0)
		.map(val => val.replace(/^(\d+)-(\d+) (.+): (.*)$/, '$1\n$2\n$3\n$4').split('\n'))
		.filter(val => val[3][val[0] - 1] != val[3][val[1] - 1] && (val[3][val[0] - 1] == val[2] || val[3][val[1] - 1] == val[2]));
	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + validEntries.length;
	cb(resultEl);
	return;
});
