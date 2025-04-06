import {expect, test} from "@playwright/test";

test.describe('Basic TypeScript Types: unknown, never', () => {

    test('unknown and use type guard', async () => {
        const parseJSON = (input: string): unknown => {
            try {
                return JSON.parse(input);
            } catch {
                return null;
            }
        };
        const role: string = 'admin';
        const jsonInput = JSON.stringify({ user: role });
        const result = parseJSON(jsonInput);

        if (typeof result === 'object' && result !== null && 'user' in result) {
            expect((result as { user: string }).user).toBe(role);
        } else {
            throw new Error('Invalid parsed structure');
        }
    });

    test('never', async () => {
        const throwFatal = (message: string): never => {
            throw new Error(message);
        };

        try {
            throwFatal('Something went wrong!');
        } catch (error) {
            // Function returns `never`, but here we handle the thrown error
            expect((error as Error).message).toBe('Something went wrong!');
        }
    });

});