const MIN_LENGTH = 6;

const minLength = ({testString}) => (testString.length >= MIN_LENGTH);
const containsUpperCase = ({testString}) => /^.*[A-Z]+.*$/.test(testString);
const containsLowerCase = ({testString}) => /^.*[a-z]+.*$/.test(testString);
const containsNumber = ({testString}) => /^.*\d+.*$/.test(testString);
// eslint-disable-next-line
const containsSpecialCharacter = ({testString}) => /^.*[\!@#\$%\^&\*\(\)_\-\+\=\{\[\}\]\|:;"'<,>\.]+.*$/.test(testString);
const passwordsMatch = ({testString, testString2}) => (testString.localeCompare(testString2) === 0);
// eslint-disable-next-line
const onlyValidCharacters = ({testString}) => /^([\d\!@#\$%\^&\*\(\)_\-\+\=\{\[\}\]\|:;"'<,>\.]|[A-z])+$/.test(testString);;


const allValidations = { minLength,
    containsUpperCase,
    containsLowerCase,
    containsNumber,
    onlyValidCharacters,
    containsSpecialCharacter,
    passwordsMatch,
};

exports.allValidations = allValidations;
