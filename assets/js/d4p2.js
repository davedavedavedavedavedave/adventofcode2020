init((input, cb) => {
	const parsedInput = input.split('\n\n').map(row => row.replace(/\n/g, ' ').trim().split(' ').map(pair => pair.split(':')));
	const requiredFields = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid' ];
	const optionalFields = [ 'cid' ];
	const validators = {
		'byr': val => val.length == 4 && val >= 1920 && val <= 2002, // (Birth Year) - four digits; at least 1920 and at most 2002.
		'iyr': val => val.length == 4 && val >= 2010 && val <= 2020, // (Issue Year) - four digits; at least 2010 and at most 2020.
		'eyr': val => val.length == 4 && val >= 2020 && val <= 2030, // (Expiration Year) - four digits; at least 2020 and at most 2030.
		'hgt': val => { // a number followed by either cm or in: If cm, the number must be at least 150 and at most 193. If in, the number must be at least 59 and at most 76.
			const matches = val.match(/^(\d+)(cm|in)$/);
			if (!matches) {
				return false;
			}
			if (matches[2] == 'cm') {
				return matches[1] >= 150 && matches[1] <= 193;
			} else if (matches[2] == 'in') {
				return matches[1] >= 59 && matches[1] <= 76;
			}
			return false;
		},
		'hcl': val => val.match(/^#[0-9a-z]{6}$/) != null, // a # followed by exactly six characters 0-9 or a-f.
		'ecl': val => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(val) > -1, // exactly one of: amb blu brn gry grn hzl oth.
		'pid': val => val.match(/^\d{9}$/) != null, // a nine-digit number, including leading zeroes.
		'cid': val => true // ignored, missing or not.
	}

	const validPassports = parsedInput.filter(passportFields => validatePassport(passportFields, requiredFields, optionalFields, validators));

	const resultEl = document.createElement('p');
	resultEl.innerHTML = 'Result: ' + validPassports.length;
	cb(resultEl);
	return;
});
