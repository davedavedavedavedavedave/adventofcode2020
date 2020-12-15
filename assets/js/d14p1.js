init((input, cb) => {
  const parsedInput = input.trim().split('\n');
  const mem = {};
  let maskOr;
  let maskAnd;
  let maskStr;

  for (let i = 0; i < parsedInput.length; i++) {
    if (parsedInput[i].indexOf('mask = ') == 0) {
      maskStr = parsedInput[i].split(' = ')[1];
      maskOr = parseInt(maskStr.replace(/[X0]/g, '0'), 2);
      maskAnd = parseInt(maskStr.replace(/[X1]/g, '1'), 2);
    } else if (parsedInput[i].indexOf('mem[') == 0) {
      let address = parsedInput[i].substr(4, parsedInput[i].indexOf(']') - 4);
      let value = +parsedInput[i].split(' = ')[1];
      mem[address] = BitwiseOr(BitwiseAnd(value, maskAnd), maskOr);
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

function BitwiseAnd(val1, val2) {
    var shift = 0, result = 0;
    var mask = ~((~0) << 30); // Gives us a bit mask like 01111..1 (30 ones)
    var divisor = 1 << 30; // To work with the bit mask, we need to clear bits at a time
    while( (val1 != 0) && (val2 != 0) ) {
        var rs = (mask & val1) & (mask & val2);
        val1 = Math.floor(val1 / divisor); // val1 >>> 30
        val2 = Math.floor(val2 / divisor); // val2 >>> 30
        for(var i = shift++; i--;) {
            rs *= divisor; // rs << 30
        }
        result += rs;
    }
    return result;
}
function BitwiseOr(val1, val2) {
    var shift = 0, result = 0;
    var mask = ~((~0) << 30); // Gives us a bit mask like 01111..1 (30 ones)
    var divisor = 1 << 30; // To work with the bit mask, we need to clear bits at a time
    while( (val1 != 0) || (val2 != 0) ) {
        var rs = (mask & val1) | (mask & val2);
        val1 = Math.floor(val1 / divisor); // val1 >>> 30
        val2 = Math.floor(val2 / divisor); // val2 >>> 30
        for(var i = shift++; i--;) {
            rs *= divisor; // rs << 30
        }
        result += rs;
    }
    return result;
}
