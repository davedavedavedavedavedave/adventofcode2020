init((input, cb) => {
  const parsedInput = input.trim()
    .split('\n\n')
    .map(group => getUniqueCharacters(group.replace(/\n/g, '')).length);

  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result: ' + parsedInput.reduce((a, b) => a + b, 0);
  cb(resultEl);
  return;
});

function getUniqueCharacters(str) {
  const characters = [];
  for (let i = 0; i < str.length; i++) {
    if (characters.indexOf(str[i]) < 0) {
      characters.push(str[i]);
    }
  }
  return characters;
}
