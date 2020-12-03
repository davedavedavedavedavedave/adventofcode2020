init((input, cb) => {
	const parsedInput = input.split('\n').map(val => val*1);
	const result = getNumbersWhichAddUpToX(parsedInput, 2020, 2);
	
	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result (' + result.join(' * ') + '): ' + result.reduce((a, b) => a*b, 1);
	cb(resultEl);
	return;
});

function getNumbersWhichAddUpToX(listOfNumbers, targetSum, numberOfNumbers) {
	let number;
	while (number = listOfNumbers.shift()) {
		if (numberOfNumbers > 1) {
			const result = getNumbersWhichAddUpToX(listOfNumbers.slice(0), targetSum - number, numberOfNumbers - 1);
			if (result) {
				return result.concat(number);
			}
		} else {
			if (number === targetSum) {
				return [number];
			}
		}
	}
	return null;
}
