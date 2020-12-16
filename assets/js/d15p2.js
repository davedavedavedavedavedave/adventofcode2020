init((input, cb) => {
  const parsedInput = input.trim().split(',').map(val => +val);
  const lastUsedAtPosition = {};

  for (let i = 0; i < parsedInput.length - 1; i++) {
  	lastUsedAtPosition[parsedInput[i]] = i;
  }

  let position = parsedInput.length - 1;
  let subject = parsedInput[position];

  while (position < 30000000 - 1) {
    let nextSubject = !isNaN(lastUsedAtPosition[subject]) ? (position - lastUsedAtPosition[subject]) : 0;
    lastUsedAtPosition[subject] = position;
    subject = nextSubject;
    position += 1;
  }
  
  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result: ' + subject;
  cb(resultEl);
  return;
});
