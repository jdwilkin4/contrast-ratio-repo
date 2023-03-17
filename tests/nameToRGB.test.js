import { isNamedColor, nameToRGB } from "../helpers";

test("Valid name", () => {
  expect(isNamedColor("yellow")).toStrictEqual(true);
});

test("Invalid name", () => {
  expect(isNamedColor("xxxxx")).toStrictEqual(false);
});

test("Valid name 'black'", () => {
  expect(nameToRGB("black")).toStrictEqual([0, 0, 0]);
});
