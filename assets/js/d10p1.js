init((input, cb) => {
	const parsedInput = [0].concat(input.trim().split('\n').map(val => val*1).sort((a, b) => a - b));
	parsedInput.push(parsedInput[parsedInput.length - 1] + 3);

	const joltDifferenceCounts = { };
	for (let i = 1; i < parsedInput.length; i++) {
		const difference = parsedInput[i] - parsedInput[i - 1];
		if (!joltDifferenceCounts[difference]) {
			joltDifferenceCounts[difference] = 1;
		} else {
			joltDifferenceCounts[difference] += 1;
		}

	}

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result (1 jolt difference: ' + joltDifferenceCounts[1] + ' * 3 jolt difference: ' + joltDifferenceCounts[3] + '): ' + (joltDifferenceCounts[1] * joltDifferenceCounts[3]);
	cb(resultEl);
	return;
});
