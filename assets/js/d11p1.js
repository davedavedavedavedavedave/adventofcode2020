init((input, cb) => {
	const parsedInput = input.trim();

	const seatMap = new SeatMap(parsedInput);
	seatMap.runSimulation();

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + seatMap.mapStr.match(/#/g).length;
	cb(resultEl);
	return;
});

function SeatMap(map) {
	this.mapStr = map;
	this.map = this.getMap();
}
SeatMap.prototype.runSimulation = function() {
	const newMap = this.getMap();
	let oldMapStr = '';
	while (oldMapStr != this.mapStr) {
		oldMapStr = this.mapStr;
		this.simulationStep();
	}
}
SeatMap.prototype.simulationStep = function () {
	const newMap = this.getMap();
	for (let i = 0; i < this.map.length; i++) {
		for (let j = 0; j < this.map[i].length; j++) {
			const adjacentSeats = this.getSeatsAdjacentTo(i, j);
			if (this.map[i][j] == 'L' && adjacentSeats.filter(val => val == '#').length == 0) {
				newMap[i][j] = '#';
			} else if (this.map[i][j] == '#' && adjacentSeats.filter(val => val == '#').length >= 4) {
				newMap[i][j] = 'L';
			}
			
		}
	}
	this.setMap(newMap);
}
SeatMap.prototype.getMap = function() {
	return this.mapStr.split('\n').map(row => row.split(''));
}
SeatMap.prototype.setMap = function(map) {
	this.map = map;
	this.mapStr = this.map.map(row => row.join('')).join('\n');
}
SeatMap.prototype.getSeatsAdjacentTo = function(row, col) {
	const seats = [];
	if (row > 0) {
		if (col > 0) {
			seats.push(this.map[row-1][col-1]);
		}
		seats.push(this.map[row-1][col]);
		if (col < this.map[0].length - 1) {
			seats.push(this.map[row-1][col+1]);
		}
	}
	if (col > 0) {
		seats.push(this.map[row][col-1]);
	}
	if (col < this.map[0].length - 1) {
		seats.push(this.map[row][col+1]);
	}
	if (row < this.map.length - 1) {
		if (col > 0) {
			seats.push(this.map[row+1][col-1]);
		}
		seats.push(this.map[row+1][col]);
		if (col < this.map[0].length - 1) {
			seats.push(this.map[row+1][col+1]);
		}
	}
	return seats;
}
