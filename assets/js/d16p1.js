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

  let validator = new TicketValidator(validatorCfgs);
  let invalidValues = [];
  for (let i = 0; i < nearbyTickets.length; i++) {
    let ticket = new Ticket(nearbyTickets[i]);
    invalidValues = invalidValues.concat(validator.validate(ticket));
  }

  const resultEl = document.createElement('p');
  resultEl.innerHTML = 'Result: ' + invalidValues.reduce((a, b) => a + b, 0);
  cb(resultEl);
  return;
});

function TicketValidator(validatorCfgs) {
  this.validatorCfgs = validatorCfgs;
}
TicketValidator.prototype.validate = function(ticket) {
  let invalidValues = [];
  for (let i = 0; i < ticket.fieldValues.length; i++) {
    const value = ticket.fieldValues[i];
    let matchingValidator;

    for (let j = 0; j < this.validatorCfgs.length; j++) {
      const validator = this.validatorCfgs[j];
      let matchingRule;

      for (let k = 0; k < validator.rules.length; k++) {
        const rule = validator.rules[k];

        if (value >= rule[0] && value <= rule[1]) {
          matchingRule = rule;
          break;
        }
      }

      if (matchingRule) {
        matchingValidator = validator;
        break;
      }
    }

    if (!matchingValidator) {
      invalidValues.push(value);
    }
  }
  return invalidValues;
}
function Ticket(values) {
  this.fieldValues = values;
}
