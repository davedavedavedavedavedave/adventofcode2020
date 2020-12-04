init((input, cb) => {
	const parsedInput = input.split('\n\n').map(row => row.replace(/\n/g, ' ').trim().split(' ').map(pair => pair.split(':')));
	const requiredFields = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid' ];
	const optionalFields = [ 'cid' ];

	const validPassports = parsedInput.filter(passportFields => validatePassport(passportFields, requiredFields, optionalFields));

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + validPassports.length;
	cb(resultEl);
	return;
});

function validatePassport(passportFields, requiredFields, optionalFields, validators) {
	const myRequiredFields = requiredFields.slice(0);
	const myOptionalFields = optionalFields.slice(0);

	for (let i = 0; i < passportFields.length; i++) {
		const key = passportFields[i][0];
		if (myRequiredFields.indexOf(key) > -1) {
			myRequiredFields.splice(myRequiredFields.indexOf(key), 1);
		} else if (myOptionalFields.indexOf(key) > -1) {
			myOptionalFields.splice(myOptionalFields.indexOf(key), 1);
		} else {
			return false; // invalid field
		}
		if (validators && validators[key] && !validators[key](passportFields[i][1])) {
			return false; // validation failed
		}
	}
	return myRequiredFields.length === 0; // all mandatory fields are there
}
