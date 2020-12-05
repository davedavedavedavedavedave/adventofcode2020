init((input, cb) => {
  const parsedInput = input.trim().split('\n').map(seatCodeToNumbers).sort((a, b) => a.id - b.id);

  let mySeatId;
  for (let i = 0; i < parsedInput.length - 1; i++) {
    if (parsedInput[i + 1].id - 1 != parsedInput[i].id) {
      mySeatId = parsedInput[i].id + 1;
      break;
    }
  }

  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result: ' + mySeatId;
  cb(resultEl);
  return;
});
