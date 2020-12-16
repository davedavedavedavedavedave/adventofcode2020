init((input, cb) => {
  const parsedInput = input.trim().split('\n');
  const mem = {};
  let maskOr;
  let maskAnd;
  let maskStr;
  let replacements;

  for (let i = 0; i < parsedInput.length; i++) {
    if (parsedInput[i].indexOf('mask = ') == 0) {
      maskStr = parsedInput[i].split(' = ')[1];
      maskOr = parseInt(maskStr.replace(/[X]/g, '0'), 2);
      maskAnd = parseInt(maskStr.replace(/[0]/g, '1').replace(/[X]/g, '0'), 2);
      let replacementPositions = [];
      for (let i = 0; i < maskStr.length; i++) {
        if (maskStr[i] == 'X') {
          replacementPositions.push(i);
        }
      }
      replacements = [];
      for (let i = 0; i < Math.pow(2, replacementPositions.length); i++) {
        let iStr = (Array(replacementPositions.length).fill(0).join('') + i.toString(2)).substr(-replacementPositions.length);
        replacements.push(replacementPositions.map((pos, idx) => {
          return {
            pos: pos,
            val: iStr[idx]
          }
        }));
      }
    } else if (parsedInput[i].indexOf('mem[') == 0) {
      let value = +parsedInput[i].split(' = ')[1];
      let address = +parsedInput[i].substr(4, parsedInput[i].indexOf(']') - 4);
      address = (Array(maskStr.length).fill(0).join('') + BitwiseOr(BitwiseAnd(address, maskAnd), maskOr).toString(2)).substr(-maskStr.length).split('');
      for (let i = 0; i < replacements.length; i++) {
        for (var j = 0; j < replacements[i].length; j++) {
          address[replacements[i][j].pos] = replacements[i][j].val;
        }
        mem[parseInt(address.join(''), 2)] = value;
      }
    }
  }

  let result = 0;
  for (let key in mem) {
    result += mem[key];
  }

  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result: ' + result;
  cb(resultEl);
  return;
});
