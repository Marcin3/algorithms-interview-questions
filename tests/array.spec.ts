import {expect, test} from "@playwright/test";
import cloneDeep from "lodash/cloneDeep";

test.describe('Array', () => {

    test('Adding using push and unshift', async () => {
        const arr: number[] = [];
        arr.push(10); // add on end of array
        arr.unshift(5); // add on start of array
        arr.push(15);
        expect(arr).toEqual([5, 10, 15]);
    });

    test('Remove using pop and shift', async () => {
        const arr: number[] = [5, 10, 15];
        arr.pop(); // remove from end of array
        arr.shift(); // remove from start of array

        expect(arr).toEqual([10]);
    });

    test('Check using includes and indexOf', async () => {
        const arr: number[] = [5, 10, 15, 5];
        expect(arr.includes(10), 'check that array contains 10').toBeTruthy();
        expect(arr.indexOf(5), 'check if the array has the first occurrence of the value at index 0').toBe(0);
        expect(arr.lastIndexOf(5), 'check if the array has the last occurrence of the value at index 3').toBe(3);
    });

    test('Combines arrays with concat and spread operator ...', async () => {
        const arr1: number[] = [5, 10, 15,];
        const arr2: number[] = [17, 11, 5];

        expect(arr1.concat(arr2), 'check array concatenation result').toEqual([5, 10, 15, 17, 11, 5]);
        expect([7, ...arr1, 9, ...arr2], 'combination of arrays with spread operator').toEqual([7, 5, 10, 15, 9, 17, 11, 5]);
        const nested = [7, arr1, 9, arr2]
        const flat = nested.flat(Infinity);
        expect(flat, 'combination of arrays with flat operator').toEqual([7, 5, 10, 15, 9, 17, 11, 5]);
    });

    test('Shallow copy vs Deep copy', async () => {
        const arrPrimitiveTypes: number[] = [5, 10, 15];
        const shallowPrimitiveTypes = [...arrPrimitiveTypes];
        shallowPrimitiveTypes[0] = 7;
        expect(shallowPrimitiveTypes, 'shallow copy of primitive types').toEqual([7, 10, 15]);
        expect(arrPrimitiveTypes, 'shallow copy does not change primitive types').toEqual([5, 10, 15]);

        /// Object
        const arrObject = [{ x: 1 }, { y: 2 }];
        const shallow = [...arrObject];
        shallow[0].x = 333;
        expect(shallow[0].x, 'shallow copy of object').toEqual(333);
        expect(arrObject[0].x, 'shallow copy change also object').toEqual(333);

        const arrObject2 = [{ x: 1 }, { y: 2 }];
        const deep  = cloneDeep(arrObject2);
        deep[0].x = 999;

        expect(deep[0].x, 'deep copy from lodash of object').toEqual(999);
        expect(arrObject2[0].x, 'deep copy from lodash does not change object').toEqual(1);
    });

});