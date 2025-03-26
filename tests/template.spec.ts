import {expect, test} from "@playwright/test";

const testCases = [
    {value: 'todo', result: true},
    {value: 'todo1', result: false}
]

testCases.forEach(({value, result}) => {
    test(`description todo ${value}`, () => {
        expect(methodToImplemented(value)).toEqual(result)
    })

})

const methodToImplemented = (value) => {
    return false;

}