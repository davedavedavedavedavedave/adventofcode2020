init((input, cb) => {
	const parsedInput = parseBagInput(input.trim());

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + (whichBagsContainBag(parsedInput, 'shiny gold').length - 1);
	cb(resultEl);
	return;
});

function parseBagInput(input) {
	const bags = {};
	const parsedInput = input.trim().split('\n').map(row => {
		row = row.split(' bags contain ');
		return bags[row[0]] = {
			children: row[1] == 'no other bags.' ? [] : row[1].replace(/ bags?([,\.])/g, ' bags$1').replace(/ bags\.$/, '').split(' bags, ').map(bag => {
				const matches = bag.match(/^(\d+) (.+)$/);
				return {
					qty: matches[1],
					bag: matches[2] // only string placeholder of bag, will be replaced with object reference later
				}
			}),
			name: row[0],
			accumulatedQty: row[1] == 'no other bags.' ? 1 : null
		};
	});

	// replace string placeholder of bags with reference to correct object
	for (let key in bags) {
		for (var i = 0; i < bags[key].children.length; i++) {
			bags[key].children[i].bag = bags[bags[key].children[i].bag];
		}
	}

	// accumulate quantities
	let accumulatingDone = false;
	while (!accumulatingDone) {
		accumulatingDone = true;
		for (let i = 0; i < parsedInput.length; i++) {
			console.log(1);
			// IF not already accumulated
			// AND all children have accumulated quantity set
			if (!parsedInput[i].accumulatedQty && parsedInput[i].children.findIndex(child => child.bag.accumulatedQty == null) < 0) {
				accumulatingDone = false;
				// sum up children multiplied by quantity, add 1 bag (the containing bag itself) and assign the result to this bag's accumulatedQty for the next iteration
				parsedInput[i].accumulatedQty = parsedInput[i].children.reduce((a, b) => a + b.qty * b.bag.accumulatedQty, 1);
			}
		}
	}

	return parsedInput;
}
function whichBagsContainBag(bags, bagName) {
	const matchingBags = [bagName];
	let matchingBagsCount = 0;
	// while new bags are added to the list of matching bags
	while (matchingBags.length > matchingBagsCount) {
		matchingBagsCount = matchingBags.length;
		for (let i = 0; i < bags.length; i++) {
			// IF bag isn't already in list of matched bags
			// AND it contains any of the already matched bags
			if (matchingBags.indexOf(bags[i].name) < 0 && bags[i].children.findIndex(child => matchingBags.indexOf(child.bag.name) > -1) > -1) {
				// add it to the list of matched bags
				matchingBags.push(bags[i].name);
			}
		}
	}
	return matchingBags;
}
