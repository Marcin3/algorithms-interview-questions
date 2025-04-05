import {expect, test} from "@playwright/test";

test.describe(`Primitive types`, () => {
    test('string', {}, async () => {
        let str = 'Avia';
        // this will return TypeError: Cannot assign to read only property '0' of string 'Avia'
        // but it will be ignore in javaScript
        // str[0] = 'B';
        // result in JS will be Avia
        let newStr = "B" + str.slice(1);
        expect(newStr, "String should be modified with first character replaced").toEqual('Bvia');

    })

    test('number', {}, async () => {
        const result1 = 0 / 0;
        const result2 = parseInt("abc");
        expect(result1, "Division 0/0 should result in NaN").toEqual(NaN);
        expect(result2, "Parsing non-numeric string should result in NaN").toEqual(NaN);
        const result3 = 0 / 0;
        expect(result3, "Second division 0/0 should also be NaN").toEqual(NaN);
        expect(result1 == result3, "NaN is not equal to anything, even itself.").toBeFalsy();
    })

    test('falsy value', {}, async () => {
        expect(0, "Zero should be falsy in JavaScript").toBeFalsy();
        expect(-0, "Negative zero should be falsy in JavaScript").toBeFalsy();
        expect("", "Empty string should be falsy in JavaScript").toBeFalsy();
        expect(null, "Null should be falsy in JavaScript").toBeFalsy();
        expect(undefined, "Undefined should be falsy in JavaScript").toBeFalsy();
        expect(NaN, "NaN should be falsy in JavaScript").toBeFalsy();
    })
});


