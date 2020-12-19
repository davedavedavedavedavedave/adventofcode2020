init((input, cb) => {
  const parsedInput = input.trim().split('\n\n');
  const validatorCfgs = parsedInput[0].split('\n').map(row => {
    let cfg = row.split(': ');
    return {
      name: cfg[0],
      rules: cfg[1].split(' or ').map(rule => rule.split('-').map(val => +val))
    }
  });
  const nearbyTickets = parsedInput[2].split('\n').slice(1).map(row => row.split(',').map(val => +val));
  const myTicket = new Ticket(parsedInput[1].split('\n')[1].split(',').map(val => +val));

  let validator = new TicketValidator(validatorCfgs);
  let validations = [];
  for (let i = 0; i < nearbyTickets.length; i++) {
    let ticket = new Ticket(nearbyTickets[i]);
    let validation = validator.validate(ticket);
    if (validation.findIndex(val => !val.valid) != -1) {
      nearbyTickets.splice(i, 1);
      i--;
    } else {
      validations.push(validation);
    }
  }

  // remove fields from possibleFieldTypes according to what matches we had in the tickets
  const possibleFieldTypes = myTicket.fieldValues.map(() => validatorCfgs.map(val => val.name));
  for (let i = 0; i < validations.length; i++) {
    const validation = validations[i];
    for (let pos = 0; pos < validation.length; pos++) {
      const matchingValidators = validation[pos].matchingValidators;
      for (let j = 0; j < possibleFieldTypes[pos].length; j++) {
        if (matchingValidators.findIndex(item => item.name == possibleFieldTypes[pos][j]) < 0) {
          possibleFieldTypes[pos].splice(j, 1);
          j--;
        }
      }
    }
  }

  // reduce valid values for each field position based on what other positions already have unique field type
  const uniqueValues = possibleFieldTypes.find(val => val.length == 1).slice(0);
  while (possibleFieldTypes.findIndex(item => item.length > 1) >= 0) {
    for (let i = 0; i < possibleFieldTypes.length; i++) {
      if (possibleFieldTypes[i].length > 1) {
        const idx = possibleFieldTypes[i].findIndex(item => uniqueValues.indexOf(item) > -1);
        if (idx > -1) {
          possibleFieldTypes[i].splice(idx, 1);
          if (possibleFieldTypes[i].length == 1) {
            uniqueValues.push(possibleFieldTypes[i][0]);
          }
        }
      }
    }
  }

  // multiply 'departure' values to get final result
  let result = 1;
  for (let i = 0; i < possibleFieldTypes.length; i++) {
    if (possibleFieldTypes[i][0].indexOf('departure') > -1) {
      result *= myTicket.fieldValues[i];
      console.log(i, myTicket.fieldValues[i], result);
    }
  }

  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result: ' + result;
  cb(resultEl);
  return;
});
