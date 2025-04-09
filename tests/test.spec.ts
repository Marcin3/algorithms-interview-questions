import {test, expect} from '@playwright/test';

test.describe('compare normal and arrow function', () => {

    class Tester {
        name = 'TesterClass';

        normalFunction() {
            return this?.name;
        }

        arrowFunction = () => {
            return this.name;
        }
    }

    const tester = new Tester();

    test('Arrow function ', async ({page}) => {
        const arrow = tester.arrowFunction;

        expect(tester.arrowFunction()).toBe('TesterClass');
        expect(arrow()).toBe('TesterClass');
    });

    test('Normal function ', async ({page}) => {
        const normal = tester.normalFunction;

        expect(tester.normalFunction()).toBe('TesterClass');
        expect(normal()).toBe(undefined);
    });
});
