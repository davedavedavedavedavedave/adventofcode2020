init((input, cb) => {
	const parsedInput = input.split('\n').filter(val => val.length > 0).map(val => {
		const retVal = {
			regex: new RegExp(val.replace(/^(\d+)-(\d+) (.+): .*$/, '^(?:[^$3]*$3[^$3]*){$1,$2}$')),
			value: val.replace(/^.*: (.+)$/, '$1')
		}
		retVal.match = retVal.regex.exec(retVal.value);
		return retVal;
	});
	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + parsedInput.filter(val => val.match != null).length;
	cb(resultEl);
	return;
});
