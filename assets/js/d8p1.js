init((input, cb) => {
	const parsedInput = input.trim().split('\n').map(row => row.split(' '));
	const machine = new LogicMachine(parsedInput, { abortOnDuplicateInstructionExecution: true });
	machine.run();

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + machine.accumulator;
	cb(resultEl);
	return;
});

function LogicMachine(instructions, settings) {
	this.instructions = instructions;
	this.settings = settings || {};
	this.cursor = 0;
	this.accumulator = 0;
	this.cursorHistory = [];
}
LogicMachine.prototype.run = function() {
	this.accumulator = 0;
	this.cursor = 0;
	while (true) {
		// keep track of which instructions have been executed how many times
		if (this.settings.abortOnDuplicateInstructionExecution && this.cursorHistory.indexOf(this.cursor) > -1) {
			return;
		}
		this.cursorHistory.push(this.cursor);

		// do stuff
		this.executeStep();
	}
}
LogicMachine.prototype.executeStep = function () {
	const instruction = this.instructions[this.cursor];

	switch (instruction[0]) {
		case 'jmp':
			this.cursor += 1*instruction[1];
			break;
		case 'acc':
			this.accumulator += 1*instruction[1];
			this.cursor += 1;
			break;
		case 'nop':
			this.cursor += 1;
			break;
	}
}
