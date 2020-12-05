init((input, cb) => {
  const parsedInput = input.trim().split('\n').map(seatCodeToNumbers).sort((a, b) => a.id - b.id);

  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result: ' + parsedInput[parsedInput.length - 1].id;
  cb(resultEl);
  return;
});

function seatCodeToNumbers(code) {
  code = code.replace(/[FL]/g, '0').replace(/[BR]/g, '1');
  const row = parseInt(code.substr(0, 7), 2);
  const column = parseInt(code.substr(7, 3), 2);

  return {
    row: row,
    column: column,
    id: row * 8 + column
  }
}
