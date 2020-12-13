init((input, cb) => {
  const parsedInput = input.trim().split('\n').map(row => {
    return {
      action: row.substr(0, 1),
      value: +row.substr(1)
    }
  });

  const coordinates = [0, 0];
  let moveVector = [10, 1];

  for (let i = 0; i < parsedInput.length; i++) {
    switch (parsedInput[i].action) {
      case 'N':
        moveVector[1] += parsedInput[i].value;
        break;
      case 'S':
        moveVector[1] -= parsedInput[i].value;
        break;
      case 'E':
        moveVector[0] += parsedInput[i].value;
        break;
      case 'W':
        moveVector[0] -= parsedInput[i].value;
        break;
      case 'R':
        parsedInput[i].value = -parsedInput[i].value;
        // fall through case!
      case 'L':
        let turnAngleRadians = parsedInput[i].value * (Math.PI/180);
        moveVector = [
          (Math.cos(turnAngleRadians) * moveVector[0] - Math.sin(turnAngleRadians) * moveVector[1]).toFixed() * 1,
          (Math.sin(turnAngleRadians) * moveVector[0] + Math.cos(turnAngleRadians) * moveVector[1]).toFixed() * 1
        ];
        break;
      case 'F':
        coordinates[0] += moveVector[0] * parsedInput[i].value;
        coordinates[1] += moveVector[1] * parsedInput[i].value;
        break;
    }
  }

  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result (' + Math.abs(coordinates[0]) + ' + ' + Math.abs(coordinates[1]) + '): ' + (Math.abs(coordinates[0]) + Math.abs(coordinates[1]));
  cb(resultEl);
  return;
});
