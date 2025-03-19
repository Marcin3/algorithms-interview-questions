import {test, expect} from '@playwright/test';

const text = "Lorcaem ipdsum dolbor sit amet."
const occurrencesToRemove = 2;

const testCases = [
    {letter: 'a', expected: 'Lorcem ipdsum dolbor sit met.'},
    {letter: 'b', expected: 'Lorcaem ipdsum dolor sit amet.'},
    {letter: 'c', expected: 'Loraem ipdsum dolbor sit amet.'}
];

testCases.forEach(({letter, expected}) => {
    test(`Remove letter ${letter} ${occurrencesToRemove} times from ${text}`, async ({}) => {
        expect(removeLetter(text, letter, occurrencesToRemove)).toEqual(expected);
    });
});

/**
 * Removes a specified number of occurrences of a given letter from a sentence, case-insensitive.
 * @param sentence - The input sentence to process
 * @param letter - The letter to remove (case-insensitive)
 * @param count - The number of occurrences of the letter to remove
 * @returns The sentence with the specified number of letter occurrences removed
 */
function removeLetter(sentence: string, letter: string, count: number): string {
    let removed = 0;
    const regex = new RegExp(letter, 'gi');
    return sentence.replace(regex, match => removed++ < count ? '' : match);
}