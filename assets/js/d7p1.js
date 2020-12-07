init((input, cb) => {
	const bags = {};
	const parsedInput = input.trim().split('\n').map(row => {
		row = row.split(' bags contain ');
		bags[row[0]] = row[1] == 'no other bags.' ? [] : row[1].replace(/ bags?([,\.])/g, ' bags$1').replace(/ bags\.$/, '').split(' bags, ').map(bag => {
			const matches = bag.match(/^(\d+) (.+)$/);
			return {
				qty: matches[1],
				name: matches[2],
				bag: matches[2]
			}
		});
		return {
			name: row[0],
			bag: bags[row[0]]
		};
	});

	for (let key in bags) {
		for (var i = 0; i < bags[key].length; i++) {
			bags[key][i].bag = bags[bags[key][i].bag];
		}
	}

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + (whichBagsContainBag(parsedInput, bags['shiny gold']).length - 1);
	cb(resultEl);
	return;
});

function whichBagsContainBag(bags, bag) {
	const matchingBags = [bag];
	let matchingBagsCount = 0;
	// while new bags are added to the list of matching bags
	while (matchingBags.length > matchingBagsCount) {
		matchingBagsCount = matchingBags.length;
		for (let i = 0; i < bags.length; i++) {
			console.log(1);
			// IF bag isn't already in list of matched bags
			// AND it contains any of the already matched bags
			if (matchingBags.indexOf(bags[i]) < 0 && bags[i].bag.findIndex(bag => matchingBags.indexOf(bag) > -1) > -1) {
				// add it to the list of matched bags
				matchingBags.push(bags[i]);
			}
		}
	}
	return matchingBags;
}
