import { allValidations } from './validations';
const validationTests = [
    {input: {testString: ''}, functionToTest: 'minLength', expectedOutput: false},
    {input: {testString: 'abc'}, functionToTest: 'minLength', expectedOutput: false},
    {input: {testString: '123456'}, functionToTest: 'minLength', expectedOutput: true},
    {input: {testString: '123456'}, functionToTest: 'containsUpperCase', expectedOutput: false},
    {input: {testString: '123T56'}, functionToTest: 'containsUpperCase', expectedOutput: true},
    {input: {testString: '123Ts56'}, functionToTest: 'containsLowerCase', expectedOutput: true},
    {input: {testString: '123456'}, functionToTest: 'containsLowerCase', expectedOutput: false},
    {input: {testString: '123456'}, functionToTest: 'containsSpecialCharacter', expectedOutput: false},
    {input: {testString: '123456!'}, functionToTest: 'containsSpecialCharacter', expectedOutput: true},
    {input: {testString: '🕴️'}, functionToTest: 'containsSpecialCharacter', expectedOutput: false},
];
'!@#$%^&*()_-+={[}]|:;"\'<,>.'.split('').forEach((specialChar) => {
    validationTests.push({
        input: {testString: `${specialChar}`}, 
        functionToTest: 'containsSpecialCharacter', 
        expectedOutput: true
    });
});

validationTests.forEach(({input, functionToTest, expectedOutput}, i) => {
    test(`${i} ${functionToTest} ${JSON.stringify(input)}`, () => {
        expect(allValidations[functionToTest](input)).toBe(expectedOutput)
    });
});