import { textToRGB } from "../helpers";

test("Empty string", () => {
  expect(textToRGB("")).toStrictEqual(null);
});

test("Valid name 'black'", () => {
  expect(textToRGB("black")).toStrictEqual([0, 0, 0]);
});

test("Invalid name 'unknown color'", () => {
  expect(textToRGB("unknown color")).toStrictEqual(null);
});

test("Valid RGB", () => {
  expect(textToRGB("rgb(0, 0, 0)")).toStrictEqual([0, 0, 0]);
});

test("Invalid RGB", () => {
  expect(textToRGB("rgb(256, 0, 0)")).toStrictEqual(null);
});

test("Valid HSL", () => {
  expect(textToRGB("hsl(0, 0%, 0%)")).toStrictEqual([0, 0, 0]);
});

test("Invalid HSL", () => {
  expect(textToRGB("hsl(361, 120%, 0%)")).toStrictEqual(null);
});

test("Valid HEX", () => {
  expect(textToRGB("#000000")).toStrictEqual([0, 0, 0]);
  expect(textToRGB("#000")).toStrictEqual([0, 0, 0]);
});

test("Invalid HEX", () => {
  expect(textToRGB("#0000000")).toStrictEqual(null);
  expect(textToRGB("#0")).toStrictEqual(null);
});
