import {expect, test} from "@playwright/test";

test.describe("Set in JavaScript/TypeScript", () => {

    test("take duplicate from array", async () => {
        const names = ["Ania", "Bartek", "Celina", "Ania", "Daniel", "Bartek"];
        const seen = new Set<string>();
        const duplicates = new Set<string>();

        names.forEach(name => {
            if(seen.has(name)) {
                duplicates.add(name);
            } else {
                seen.add(name);
            }
        })

        expect(Array.from(duplicates)).toEqual(["Ania", "Bartek"]);
    });

});
