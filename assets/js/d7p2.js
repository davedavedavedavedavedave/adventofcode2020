init((input, cb) => {
	const parsedInput = parseBagInput(input.trim());

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + (parsedInput.find(bag => bag.name == 'shiny gold').accumulatedQty - 1);
	cb(resultEl);
	return;
});
