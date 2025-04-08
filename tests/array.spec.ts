import {expect, test} from "@playwright/test";
import {cloneDeep} from "lodash";

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
        const arrObject = [{x: 1}, {y: 2}];
        const shallow = [...arrObject];
        shallow[0].x = 333;
        expect(shallow[0].x, 'shallow copy of object').toEqual(333);
        expect(arrObject[0].x, 'shallow copy change also object').toEqual(333);

        const arrObject2 = [{x: 1}, {y: 2}];
        const deep = cloneDeep(arrObject2);
        deep[0].x = 999;

        expect(deep[0].x, 'deep copy from lodash of object').toEqual(999);
        expect(arrObject2[0].x, 'deep copy from lodash does not change object').toEqual(1);
    });

    test('sort', async () => {
        const arr: number[] = [30, 2, 10];
        expect(arr.sort(), 'this method sort array like as string').toEqual([10, 2, 30]);
        expect(arr.sort((a, b) => a - b), 'to sort number we need to use callback').toEqual([2, 10, 30]);
    });

    test('find and findIndex', async () => {
        const arr: number[] = [14, 30, 2];
        expect(arr.find((n) => n > 7), 'Returns the value of the first element in the array where predicate is true').toEqual(14);
        expect(arr.findIndex((n) => n > 7), 'Returns the index of the first element in the array where predicate is true').toEqual(0);
    });

    test('filter', async () => {
        const arr: number[] = [14, 3, 2, 1];
        const even = arr.filter(n => n % 2 === 0);
        expect(even, 'filter for even number').toEqual([14, 2]);

        const text: string = "ssssportsss"
        const withoutLetterS = text.split('').filter(letter => letter !== "s").join('');
        expect(withoutLetterS, 'filter will remove letter from string').toEqual("port")

        const mixed = [0, -0, NaN, 1, "a", false, true, undefined, null, "", {}];
        const truthyOnly = mixed.filter(Boolean);
        expect(truthyOnly, 'filter will remove falsy values').toEqual([1, "a", true, {}]);

        const users = [{name: 'John', age: 12}, {name: 'Jane', age: 18}, {name: 'Bob', age: 30}];
        const olderThan18 = users.filter(user => user.age >= 18);
        expect(olderThan18, 'filter will remove users younger then 18').toEqual([{name: 'Jane', age: 18}, {
            name: 'Bob',
            age: 30
        }]);
    });

    test('map', async () => {
        const arr: number[] = [14, 3, 2, 1];
        const str: string[] = arr.map(n => n.toString());
        expect(str, 'map will convert number to string').toEqual(["14", "3", "2", "1"]);

        const namesInterface = [{name: "Ala"}, {name: "Ola"}];
        const namesOnly = namesInterface.map(user => user.name);
        expect(namesOnly, 'map will change array of object to array of string').toEqual(["Ala", "Ola"]);
    })

    test('reduce', async () => {
        const arr: string[] = ["Jack", "John", "Mel", "Tom", "John"];
        const names = arr.reduce((acc, name) => {
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        expect(names, 'reduce will count names').toEqual({Jack: 1, John: 2, Mel: 1, Tom: 1});

        const words: string[] = ["apple", "banana", "avocado", "blueberry", "apricot", "blackberry"];
        const firstLetter = words.reduce<Record<string, string[]>>((acc, word) => {
            acc[word[0]] = (acc[word[0]] || []);
            acc[word[0]].push(word);
            return acc
        }, {})

        expect(firstLetter, 'reduce will create record with first letter as a key').toEqual({
            a: ["apple", "avocado", "apricot"],
            b: ["banana", "blueberry", "blackberry"]
        });
    })

    test('tuple in TypeScript', async () => {
        const user: [string, number] = ["Ala", 30];
        expect(user[0], 'first element is a string').toEqual("Ala");
        expect(user[1], 'second element is a number').toEqual(30);

        const [name, age] = user;
        expect(name).toBe("Ala");
        expect(age).toBe(30);
    });

    test('mix to have only even numbers using multiple loop styles', async () => {
        const numbers: number[] = [1, 2, 3, 4, 5];
        const expectedArray: number[] = [2, 4];
        const filterMethod: number[] = numbers.filter(n => n % 2 === 0);
        expect(filterMethod, 'filter even using filet method').toEqual(expectedArray);

        const classicFor: number[] = [];
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 === 0) {
                classicFor.push(numbers[i])
            }
        }
        expect(classicFor, 'filter even classic for loop').toEqual(expectedArray);

        const forOf: number[] = [];
        for (const n of numbers) {
            if (n % 2 === 0) {
                forOf.push(n)
            }
        }
        expect(forOf, 'filter even using forOf loop').toEqual(expectedArray);

        const forEach: number[] = [];
        numbers.forEach((n) => {
            if (n % 2 === 0) {
                forEach.push(n)
            }
        })
        expect(forEach, 'filter even using forEach loop').toEqual(expectedArray);

        const reduceMethod = numbers.reduce<number[]>((arr, number) => {
            if (number % 2 === 0) {
                arr.push(number)
            }
            return arr;
        }, [])
        expect(reduceMethod, 'filter even using reduce method').toEqual(expectedArray);
    });

});