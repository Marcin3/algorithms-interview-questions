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

        const infinity = 1 / 0;
        expect(typeof infinity === "number", "Infinity is of type 'number'").toBeTruthy();
        expect(infinity == infinity - 1, "Subtracting from Infinity still results in Infinity").toBeTruthy();
        expect(Number.isNaN(infinity * 0), "Multiplying Infinity by 0 results in NaN").toBeTruthy();
        expect(Number.isNaN(infinity - Infinity), "Infinity minus Infinity is NaN").toBeTruthy();
        expect(1 / Infinity === 0, "1 divided by Infinity equals 0").toBeTruthy();
    })

    test('falsy value', {}, async () => {
        expect(0, "Zero should be falsy in JavaScript").toBeFalsy();
        expect(-0, "Negative zero should be falsy in JavaScript").toBeFalsy();
        expect("", "Empty string should be falsy in JavaScript").toBeFalsy();
        expect(null, "Null should be falsy in JavaScript").toBeFalsy();
        expect(undefined, "Undefined should be falsy in JavaScript").toBeFalsy();
        expect(NaN, "NaN should be falsy in JavaScript").toBeFalsy();
    })

    test('or ||', {
        annotation: {
            type: "primitiveTypes",
            description: `Returns the first true value, or the last one if all are false.`
        },
    }, async () => {
        expect(0 || -0).toBe(-0);
        expect(-0 || 0).toBe(0);
        expect(0 || 'test').toBe('test');
        // @ts-ignore
        expect('test' || 0).toBe('test');
    })

    test('and &&', {
        annotation: {
            type: "primitiveTypes",
            description: `Returns the first falsy value, or the last one if all are truthy`
        },
    }, async () => {
        expect(-0 && 0).toBe(-0);
        // @ts-ignore
        expect('aaa' && null).toBe(null);
        // @ts-ignore
        expect('aaa' && 'bbb').toBe('bbb');
    })
});


