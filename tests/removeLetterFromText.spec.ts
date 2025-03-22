import {test, expect} from '@playwright/test';

const text = "Lorcaem Ipdsumb dolbor sit ametb."
const occurrencesToRemove = 2;

const testCases = [
    {sentence: text, letter: 'a', expected: 'Lorcem Ipdsumb dolbor sit metb.'},
    {sentence: text, letter: 'b', expected: 'Lorcaem Ipdsum dolor sit ametb.'},
    {sentence: text, letter: 'c', expected: 'Loraem Ipdsumb dolbor sit ametb.'},
    {sentence: null, letter: 'z', expected: null},
    {sentence: "", letter: 'g', expected: ""}
];

testCases.forEach(({sentence, letter, expected}) => {
    test(`Remove letter ${letter} ${occurrencesToRemove} times from ${sentence}`, async ({}) => {
        expect(removeLetter(sentence, letter, occurrencesToRemove)).toEqual(expected);
    });
});

testCases.forEach(({sentence, letter, expected}) => {
    test(`Remove letter ${letter} ${occurrencesToRemove} times from ${sentence}, use basic method`, async ({}) => {
        expect(removeLetterBasic(sentence, letter, occurrencesToRemove)).toEqual(expected);
    });
});

testCases.forEach(({sentence, letter, expected}) => {
    test(`Remove letter ${letter} ${occurrencesToRemove} times from ${sentence}, use  O(n)  method`, async ({}) => {
        expect(removeLetterEfficient(sentence, letter, occurrencesToRemove)).toEqual(expected);
    });
});

function removeLetterBasic(sentence: string, letter: string, count: number) {
    if (sentence === null) return null;

    if (count <= 0 || !sentence.includes(letter)) return sentence;
    const sentenceArray: string[] = sentence.split('');
    if (sentenceArray.some(l => l === letter)) {
        for (let i = 0; i < sentenceArray.length; i++) {
            if (sentenceArray[i] === letter) {
                sentenceArray.splice(i, 1);
                break;
            }
        }
    }
    return removeLetterBasic(sentenceArray.join(''), letter, count - 1);
}

function removeLetterEfficient(sentence: string, letter: string, count: number): string {
    if (sentence === null) return null;

    let result = '';
    let removed = 0;

    for (let i = 0; i < sentence.length; i++) {
        const char = sentence[i];
        if (char === letter && removed < count) {
            removed++;
            continue;
        }
        result += char;
    }

    return result;
}


/**
 * Removes a specified number of occurrences of a given letter from a sentence, case-insensitive.
 * @param sentence - The input sentence to process
 * @param letter - The letter to remove (case-insensitive)
 * @param count - The number of occurrences of the letter to remove
 * @returns The sentence with the specified number of letter occurrences removed
 */
function removeLetter(sentence: string, letter: string, count: number): string {
    if (sentence === null) return null;

    let removed = 0;
    const regex = new RegExp(letter, 'gi');
    return sentence.replace(regex, match => removed++ < count ? '' : match);
}