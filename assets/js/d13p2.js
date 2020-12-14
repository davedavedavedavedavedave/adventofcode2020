init((input, cb) => {
  const parsedInput = input.trim().split('\n');
  const earliestTime = +parsedInput[0];
  const busses = parsedInput[1].split(',').map((val, idx) => {
    return {
      id: +val,
      offset: idx % val
    }
  }).filter(val => !isNaN(val.id));

  let currentItem = 0;
  let increment = busses[currentItem].id;
  let counter = busses[currentItem].id - busses[currentItem].offset - increment;
  let allOffsetsMatch = false;

  while (!allOffsetsMatch) {
    allOffsetsMatch = true;
    counter += increment;
    for (let i = currentItem + 1; i < busses.length; i++) {
      if (counter % busses[i].id != (busses[i].id - busses[i].offset) % busses[i].id) {
        allOffsetsMatch = false;
        break;
      }
      increment *= busses[i].id;
      currentItem += 1;
    }
  }

  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result: ' + counter;
  cb(resultEl);
  return;
});
