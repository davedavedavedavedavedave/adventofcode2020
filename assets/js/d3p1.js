init((input, cb) => {
	const parsedInput = input.split('\n').map(row => row.split(''));
	const numberOfCollisions = sledCollisions(parsedInput, { x: 3, y: 1 }, { x: 0, y: 0 });

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + numberOfCollisions;
	cb(resultEl);
	return;
});

function sledCollisions(slope, vector, position) {
	const slopeSegmentWidth = slope[0].length;
	let collisions = 0;

	while (position.y + 1 < slope.length) {
		// since slope repeats in x-direction, getting new x-position is a little more involved
		position.x += vector.x % slopeSegmentWidth;
		if (position.x < 0) {
			position.x += slopeSegmentWidth;
		} else if (position.x >= slopeSegmentWidth) {
			position.x -= slopeSegmentWidth;
		}
		// new y position is easy:
		position.y += vector.y;

		if (slope[position.y][position.x] == '#') {
			collisions += 1;
		}
	}
	return collisions;
}
