init((input, cb) => {
  const parsedInput = input.trim()
    .split('\n\n')
    .map(group => getCharactersPresentInAll(group.split('\n')).length);

  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result: ' + parsedInput.reduce((a, b) => a + b, 0);
  cb(resultEl);
  return;
});

function getCharactersPresentInAll(strings) {
  const characters = [];
  for (let i = 0; i < strings[0].length; i++) {
    let allAnsweredYes = true;
    for (let j = 1; j < strings.length; j++) {
      if (strings[j].indexOf(strings[0][i]) < 0) {
        allAnsweredYes = false;
        break;
      }
    }
    if (allAnsweredYes) {
      characters.push(strings[0][i]);
    }
  }
  return characters;
}
