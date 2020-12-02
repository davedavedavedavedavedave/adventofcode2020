init((input, cb) => {
	const parsedInput = input.split('\n').map(val => val*1);
	const result = getNumbersWhichAddUpToX(parsedInput, 2020, 3);
	const resultEl = document.createElement('p');
	console.log(result);
	resultEl.innerHTML = 'Result: ' + result.reduce((a, b) => a*b, 1);
	cb(resultEl);
	return;
});
