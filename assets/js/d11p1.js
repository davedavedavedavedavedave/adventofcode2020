init((input, cb) => {
	const parsedInput = input.trim();

	const seatMap = new SeatMap(parsedInput, 'getSeatsAdjacentTo', 0, 4);
	seatMap.runSimulation();

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + seatMap.mapStr.match(/#/g).length;
	cb(resultEl);
	return;
});

function SeatMap(map, probingMethodName, sitDownTolerance, getUpTolerance) {
	this.mapStr = map;
	this.map = this.getMap();
	this.probingMethodName = probingMethodName;
	this.sitDownTolerance = sitDownTolerance;
	this.getUpTolerance = getUpTolerance;
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
			const seatsToCheck = this[this.probingMethodName](i, j);
			if (this.map[i][j] == 'L' && seatsToCheck.filter(val => val == '#').length <= this.sitDownTolerance) {
				newMap[i][j] = '#';
			} else if (this.map[i][j] == '#' && seatsToCheck.filter(val => val == '#').length >= this.getUpTolerance) {
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
SeatMap.prototype.getSeatsVisible = function(row, col) {
	let vectors = [
		{ x: -1, y:  0 },
		{ x:  1, y:  0 },
		{ x:  0, y: -1 },
		{ x:  0, y:  1 },
		{ x: -1, y: -1 },
		{ x: -1, y:  1 },
		{ x:  1, y: -1 },
		{ x:  1, y:  1 }
	]
	const seats = [];
	for (let i = 1; vectors.length > 0; i++) {
	  for (let j = 0; j < vectors.length; j++) {
	  	let target = {
	  		row: row + i * vectors[j].x,
	  		col: col + i * vectors[j].y
	  	}
	  	if (!this.map[target.row] || !this.map[target.row][target.col]) {
	  		vectors.splice(j, 1);
	  		j -= 1;
	  	} else if (this.map[target.row][target.col] != '.') {
	  		seats.push(this.map[target.row][target.col]);
	  		vectors.splice(j, 1);
	  		j -= 1;
	  	}
	  }
	}
	return seats;
}
