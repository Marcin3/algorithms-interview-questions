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

const testCases2 = [
    {sentence: 'abab', palindrome: true},
    {sentence: 'abaB', palindrome: true},
    {sentence: 'Kajak Kajak', palindrome: true},
    {sentence: "Kajadsak", palindrome: false},
    {sentence: "ghfhf", palindrome: true}
];

testCases2.forEach(({sentence, palindrome}) => {
    test(`Check if word ${sentence} could be palindrome`, async ({}) => {
        expect(ifThisCouldBePalindrome(sentence)).toEqual(palindrome)
    })
})


const ifThisCouldBePalindrome = (word: string) => {
    const lowerCaseWord = word.toLowerCase();
    const dictionary: Record<string, number> = {};
    for (const charZ of lowerCaseWord) {
        let count = 0;
        for (const char of lowerCaseWord) {
            if (char === charZ) {
                count++;
            }
        }

        dictionary[charZ] = count
    }
    let oddCount = 0;

    for (const numberOfOccurrencesOfLetter of Object.values(dictionary)) {
        if (numberOfOccurrencesOfLetter % 2 !== 0) {
            oddCount++;
        }
    }
    console.log(Object.entries(dictionary));

    return oddCount <= 1;
}
