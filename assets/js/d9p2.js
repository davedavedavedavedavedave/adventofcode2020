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

	let numbers;
	for (let i = 0; i < parsedInput.length; i++) {
		let sum = 0;
		numbers = [];
		for (let j = i; j < parsedInput.length; j++) {
			numbers.push(parsedInput[j]);
			sum += parsedInput[j];
			if (sum >= result) {
				break;
			}
		}
		if (sum == result) {
			break;
		}
	}
	numbers = numbers.sort();

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result (' + numbers[0] + ' + ' + numbers[numbers.length - 1] + '): ' + (numbers[0] + numbers[numbers.length - 1]);
	cb(resultEl);
	return;
});
