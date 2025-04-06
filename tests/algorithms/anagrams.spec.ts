import {expect, test} from "@playwright/test";

const testCases = [
    {firstWord: "hello", secondWord: "world", anagram: false},
    {firstWord: "listen", secondWord: "silent", anagram: true},
    {firstWord: "liSten", secondWord: "silent", anagram: true},

];

testCases.forEach(({firstWord, secondWord, anagram}) => {
    test(`Check if word ${firstWord} and ${secondWord} are anagrams`, () => {
        expect(isAnagram(firstWord, secondWord)).toEqual(anagram)
    })
})

const isAnagram = (firstWord: string, secondWord: string) => {
    const sortedFirstWord = firstWord.toLowerCase().split('').sort().join('');
    const sortedSecondWord = secondWord.toLowerCase().split('').sort().join('');

    return sortedFirstWord===sortedSecondWord;
}