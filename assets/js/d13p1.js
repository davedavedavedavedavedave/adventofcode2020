init((input, cb) => {
  const parsedInput = input.trim().split('\n');
  const earliestTime = +parsedInput[0];
  const busIdsSortedByNextArrival = parsedInput[1].split(',').filter(val => !isNaN(val)).map(val => {
    return {
      id: +val,
      nextArrival: Math.ceil(earliestTime / val) * val
    }
  }).sort((a, b) => a.nextArrival - b.nextArrival);

  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result (' + busIdsSortedByNextArrival[0].id + ' * ' + (busIdsSortedByNextArrival[0].nextArrival - earliestTime) + '): ' + busIdsSortedByNextArrival[0].id * (busIdsSortedByNextArrival[0].nextArrival - earliestTime);
  cb(resultEl);
  return;
});
