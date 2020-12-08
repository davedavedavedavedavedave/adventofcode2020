init((input, cb) => {
	const parsedInput = input.trim().split('\n').map(row => row.split(' '));
	let machine;
	let lastReplacement = 0;
	do {
		const instructions = parsedInput.slice(0);
		const replaceInstructionAtIndex = instructions.slice(lastReplacement).findIndex(instruction => instruction[0] == 'nop' || instruction[0] == 'jmp');
		instructions[lastReplacement + replaceInstructionAtIndex] = instructions[lastReplacement + replaceInstructionAtIndex].slice(0);
		instructions[lastReplacement + replaceInstructionAtIndex][0] = instructions[lastReplacement + replaceInstructionAtIndex][0] == 'nop' ? 'jmp' : 'nop';
		lastReplacement += 1 + replaceInstructionAtIndex;

		machine = new LogicMachine(instructions, { abortOnDuplicateInstructionExecution: true });
		machine.run();
	} while (machine.cursor >= 0 && machine.cursor < machine.instructions.length)

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + machine.accumulator;
	cb(resultEl);
	return;
});
