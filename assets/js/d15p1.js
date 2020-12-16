init((input, cb) => {
  const parsedInput = input.trim().split(',').map(val => +val).reverse();

  while (parsedInput.length < 2020) {
    parsedInput.unshift(Math.max(parsedInput.indexOf(parsedInput[0], 1), 0));
  }
  
  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result: ' + parsedInput[0];
  cb(resultEl);
  return;
});
