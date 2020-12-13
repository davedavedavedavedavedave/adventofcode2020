init((input, cb) => {
  const parsedInput = input.trim().split('\n').map(row => {
    return {
      action: row.substr(0, 1),
      value: row.substr(1)
    }
  });

  const coordinates = [0, 0];
  let moveVector = [1, 0];

  for (let i = 0; i < parsedInput.length; i++) {
    let myVector;

    switch (parsedInput[i].action) {
      case 'N':
        myVector = [ 0, 1 ];
        break;
      case 'S':
        myVector = [ 0, -1 ];
        break;
      case 'E':
        myVector = [ 1, 0 ];
        break;
      case 'W':
        myVector = [ -1, 0 ];
        break;
      case 'R':
        parsedInput[i].value = -parsedInput[i].value;
        // fall through case!
      case 'L':
        myVector = [ 0, 0 ];
        let turnAngleRadians = parsedInput[i].value * (Math.PI/180);
        moveVector = [
          (Math.cos(turnAngleRadians) * moveVector[0] - Math.sin(turnAngleRadians) * moveVector[1]).toFixed() * 1,
          (Math.sin(turnAngleRadians) * moveVector[0] + Math.cos(turnAngleRadians) * moveVector[1]).toFixed() * 1
        ];
        break;
      case 'F':
        myVector = moveVector;
        break;
    }

    coordinates[0] += myVector[0] * parsedInput[i].value;
    coordinates[1] += myVector[1] * parsedInput[i].value;
  }

  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result (' + Math.abs(coordinates[0]) + ' + ' + Math.abs(coordinates[1]) + '): ' + (Math.abs(coordinates[0]) + Math.abs(coordinates[1]));
  cb(resultEl);
  return;
});
