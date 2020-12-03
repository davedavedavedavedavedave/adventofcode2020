init((input, cb) => {
	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + numberOfCollisions;
	cb(resultEl);
	return;
});