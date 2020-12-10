init((input, cb) => {
	const parsedInput = [0].concat(input.trim().split('\n').map(val => val*1).sort((a, b) => a - b));
	parsedInput.push(parsedInput[parsedInput.length - 1] + 3);

	const joltArrangements = parsedInput.slice(0).map(val => {
		return {
			value: val,
			accumulatedChildArrangements: 1
		};
	});
	for (let i = joltArrangements.length - 2; i >= 0; i--) {
		joltArrangements[i].accumulatedChildArrangements = 0;
		for (let j = i + 1; j < joltArrangements.length; j++) {
			if (joltArrangements[j].value - joltArrangements[i].value > 3) {
				break;
			}
			joltArrangements[i].accumulatedChildArrangements += joltArrangements[j].accumulatedChildArrangements;
		}
	}

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result : ' + joltArrangements[0].accumulatedChildArrangements;
	cb(resultEl);
	return;
});
