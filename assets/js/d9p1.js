init((input, cb) => {
	const parsedInput = input.trim().split('\n').map(val => val*1);
	const preambleLength = 25;

	let result;
	for (let i = preambleLength; i < parsedInput.length; i++) {
		const numbers = getNumbersWhichAddUpToX(parsedInput.slice(i - preambleLength, i), parsedInput[i], 2);
		if (!numbers) {
			result = parsedInput[i];
			break;
		}
	}

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + result;
	cb(resultEl);
	return;
});
