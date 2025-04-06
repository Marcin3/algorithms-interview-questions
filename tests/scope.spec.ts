import {expect, test} from "@playwright/test";

test.describe("Scope in JavaScript/TypeScript", () => {

    test("block scope with let", async () => {
        let x = 1;
        {
            let x = 2;
            expect(x, "Inner x should shadow outer x").toBe(2);
        }
        expect(x, "Outer x should remain unchanged").toBe(1);
    });

    test("block scope with const", async () => {
        const a = "outside";
        {
            const a = "inside";
            expect(a, "Const inside block should shadow outer const").toBe("inside");
        }
        expect(a, "Outer const remains unchanged").toBe("outside");
    });

    test("function scope isolation", async () => {
        const x = 10;

        function demo() {
            const x = 20;
            return x;
        }

        expect(demo(), "Function should return inner scoped x").toBe(20);
        expect(x, "Outer x remains unaffected").toBe(10);
    });

    test("closure remembers outer scope", async () => {
        function makeCounter() {
            let count = 0;
            return () => ++count;
        }

        const counter = makeCounter();
        expect(counter(), "First call should return 1").toBe(1);
        expect(counter(), "Second call should return 2").toBe(2);
    });

    test("closure encapsulates private state (createUserFactory)", () => {
        function createUserFactory() {
            interface User {
                username: string;
                password: string;
            }

            let count = 0;
            let users: User[] = [];

            return {
                createUser: () => {
                    count++;
                    const user = {
                        username: `test-user-${count}`,
                        password: "secret"
                    };
                    users.push(user);
                    return user;
                },
                getUsername: (index: number) => users[index]?  users[index].username : null
            };
        }

        const makeUser = createUserFactory();
        makeUser.createUser();
        makeUser.createUser();

        expect(makeUser.getUsername(0)).toBe("test-user-1");
        expect(makeUser.getUsername(1)).toBe("test-user-2");

        // count is private – not accessible outside
        // @ts-expect-error
        expect(typeof count).toBe("undefined");
    });

    test("closure with independent scopes", async () => {
        function makeCounter() {
            let count = 0;
            return () => ++count;
        }

        const c1 = makeCounter();
        const c2 = makeCounter();

        c1(); // 1
        c1(); // 2
        c2(); // 1

        expect(c1(), "Counter 1 should be at 3").toBe(3);
        expect(c2(), "Counter 2 should be independent").toBe(2);
    });

});
