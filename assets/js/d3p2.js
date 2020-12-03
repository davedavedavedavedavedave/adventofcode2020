init((input, cb) => {
	const parsedInput = input.split('\n').map(row => row.split(''));
	const numberOfCollisions = [
	    sledCollisions(parsedInput, { x: 1, y: 1 }, { x: 0, y: 0 }),
	    sledCollisions(parsedInput, { x: 3, y: 1 }, { x: 0, y: 0 }),
	    sledCollisions(parsedInput, { x: 5, y: 1 }, { x: 0, y: 0 }),
	    sledCollisions(parsedInput, { x: 7, y: 1 }, { x: 0, y: 0 }),
	    sledCollisions(parsedInput, { x: 1, y: 2 }, { x: 0, y: 0 })
	];

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result (' + numberOfCollisions.join(' * ') + '): ' + numberOfCollisions.reduce((a, b) => a * b, 1);
	cb(resultEl);
	return;
});