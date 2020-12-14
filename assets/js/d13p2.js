init((input, cb) => {
  const parsedInput = input.trim().split('\n');
  const earliestTime = +parsedInput[0];
  const busses = parsedInput[1].split(',').map((val, idx) => {
    return {
      id: +val,
      offset: idx % val
    }
  }).filter(val => !isNaN(val.id)).sort((a, b) => b.id - a.id);

  let increment = busses[0].id;
  let counter = busses[0].id - busses[0].offset - increment;
  let allOffsetsMatch = false;

  while (!allOffsetsMatch) {
    allOffsetsMatch = true;
    counter += increment;
    for (let i = 0; i < busses.length; i++) {
      if (counter % busses[i].id != (busses[i].id - busses[i].offset) % busses[i].id) {
          allOffsetsMatch = false;
          break;
      }
    }
  }

  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result: ' + counter;
  cb(resultEl);
  return;
});
