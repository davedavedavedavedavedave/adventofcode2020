init((input, cb) => {
	const bags = {};
	const parsedInput = input.trim().split('\n').map(row => {
		row = row.split(' bags contain ');
		bags[row[0]] = row[1] == 'no other bags.' ? [] : row[1].replace(/ bags?([,\.])/g, ' bags$1').replace(/ bags\.$/, '').split(' bags, ').map(bag => {
			const matches = bag.match(/^(\d+) (.+)$/);
			return {
				qty: matches[1],
				bagName: matches[2],
				bag: matches[2]
			}
		});
		return {
			bagName: row[0],
			bag: bags[row[0]]
		};
	});

	for (let key in bags) {
		for (var i = 0; i < bags[key].length; i++) {
			bags[key][i].bag = bags[bags[key][i].bag];
		}
	}

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + (whichBagsContainBag(parsedInput, 'shiny gold').length - 1);
	cb(resultEl);
	return;
});

function whichBagsContainBag(bags, bagName) {
	const matchingBags = [];
	for (let i = 0; i < bags.length; i++) {
		if (bags[i].bagName == bagName || whichBagsContainBag(bags[i].bag, bagName).length > 0) {
			matchingBags.push(bags[i])
		}
	}
	return matchingBags;
}
