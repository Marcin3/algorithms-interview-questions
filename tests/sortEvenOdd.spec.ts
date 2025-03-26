import {expect, test} from "@playwright/test";

const testCases = [
    {allNumbers: [1, 2, 3, 4, 5, 6], odd: [1, 3, 5], even: [2, 4, 6]},
    {allNumbers: [1, 2, 34, 44, 51, 9], odd: [1, 51, 9], even: [2, 34, 44]},
    {allNumbers: [1, 3, 5, 71], odd: [1, 3, 5, 71], even: []},
    {allNumbers: [1, 2, 2, 5, 5, 6], odd: [1, 5, 5], even: [2, 2, 6]},
]

testCases.forEach(({allNumbers, odd, even}) => {
    test(`Sort eve and odd in array ${allNumbers}`, () => {
        expect(sortEvenOdd(allNumbers)).toEqual({odd, even})
    })
})

const sortEvenOdd = (allNumbers: number[]) => {
    return allNumbers.reduce<EvenAndOdd>((acc, currentValue) => {
        if (currentValue % 2 === 0) {
            acc.even.push(currentValue);
        } else {
            acc.odd.push(currentValue);
        }
        return acc;
    }, {
        odd: [],
        even: []
    });

}

type EvenAndOdd = {
    even: number[],
    odd: number[]
}