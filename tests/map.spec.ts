import {expect, test} from "@playwright/test";

test.describe("Mao in JavaScript/TypeScript", () => {

    test("create and add", async () => {
        const peopleAges = new Map<string, number>();
        peopleAges.set("Ania", 28);
        peopleAges.set("Bartek", 34);
        peopleAges.set("Celina", 21);

        expect(peopleAges.has("Bartek")).toBeTruthy();
    });

    test("update age", async () => {
        const peopleAges = new Map<string, number>(
            [["Ania", 28], ["Bartek", 34], ["Celina", 21]]
        );
        const aniaAge = peopleAges.get("Ania");
        peopleAges.set("Ania", aniaAge !== undefined ? aniaAge + 1 : 0);
        console.log(peopleAges.get("Ania"));
    });

    test("iterate over map entries", async () => {
        const peopleAges = new Map<string, number>(
            [["Ania", 28], ["Bartek", 34], ["Celina", 21]]
        );

        for (const [key, value] of peopleAges) {
            console.log(`${key} ma ${value} lata`);
        }
    });

    test("convert map to array", async () => {
        const peopleAges = new Map<string, number>(
            [["Ania", 28], ["Bartek", 34], ["Celina", 21]]
        );

        const arr: [string, number][] = Array.from(peopleAges);
        const obj = Object.fromEntries(peopleAges);

        expect(arr).toEqual([["Ania", 28], ["Bartek", 34], ["Celina", 21]]);
        expect(obj).toEqual({"Ania": 28, "Bartek": 34, "Celina": 21});

        peopleAges.keys()
    });

    test("use keys entries", async () => {
        const peopleAges = new Map<string, number>(
            [["Ania", 28], ["Bartek", 34], ["Celina", 21]]
        );

        console.log(...peopleAges.keys());
        console.log(...peopleAges.values());
        for (const [key, values] of peopleAges.entries()) {
            console.log(`Imię: ${key}, Wiek: ${values}`);
        }
    });

    test("reverse", async () => {
        const peopleAges = new Map<string, number>([
            ["Ania", 28],
            ["Bartek", 34],
            ["Celina", 21],
            ["Daniel", 28]],
        );
        const agesPeople = new Map<number, string[]>
        for (const [name, age] of peopleAges.entries()) {
            const curentValue = agesPeople.get(age) || [];
            curentValue.push(name);
            agesPeople.set(age, curentValue);
        }

        expect(agesPeople).toEqual(new Map<number, string[]>([[28, ["Ania", "Daniel"]], [34, ["Bartek"]], [21, ["Celina"]]]));
    });

});
