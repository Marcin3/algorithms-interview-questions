import {expect, test} from "@playwright/test";


const testCases = [
    {sentence: 'kajak', palindrome: true},
    {sentence: 'Kajak Kajak', palindrome: true},
    {sentence: 'No lemon, no melon', palindrome: true},
    {sentence: "Kajak", palindrome: true},
    {sentence: "ghfhf", palindrome: false}
];

testCases.forEach(({sentence, palindrome}) => {
    test(`Check if word ${sentence} is palindrome`, async ({}) => {
        expect(isPalindrome(sentence)).toEqual(palindrome)
    })
})

const isPalindrome = (word: string) => {
    const lowerCaseWord = word.toLowerCase();
    const withoutUnwantedCharacters = lowerCaseWord.replace(/[^a-zA-Z0-9]/g, '');
    const reversed = withoutUnwantedCharacters.split('').reverse().join('');
    return reversed === withoutUnwantedCharacters;
}