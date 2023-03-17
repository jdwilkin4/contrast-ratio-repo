import { hslToRGB, isValidHSL } from "../helpers";

test("valid HSL", () => {
  expect(isValidHSL("hsl(180, 50%, 50%)")).toStrictEqual(true);
});

test("HSL both % missing", () => {
  expect(isValidHSL("hsl(180, 50, 50)")).toStrictEqual(false);
});

test("HSL saturation % missing", () => {
  expect(isValidHSL("hsl(180, 50, 50%)")).toStrictEqual(false);
});

test("HSL lightness % missing", () => {
  expect(isValidHSL("hsl(180, 50%, 50)")).toStrictEqual(false);
});

test("HSL ( missing", () => {
  expect(isValidHSL("hsl180, 50%, 50%)")).toStrictEqual(false);
});

test("HSL , missing", () => {
  expect(isValidHSL("hsl(180 50%, 50%)")).toStrictEqual(false);
});

test("HSL low boundary #000", () => {
  expect(hslToRGB("hsl(0, 0%, 0%)")).toStrictEqual([0, 0, 0]);
});

test("HSL high boundary #fff", () => {
  expect(hslToRGB("hsl(0, 100%, 100%)")).toStrictEqual([255, 255, 255]);
});

test("HSL high boundary #fff", () => {
  expect(hslToRGB("hsl(359, 0%, 100%)")).toStrictEqual([255, 255, 255]);
});

test("HSL high boundary #fff", () => {
  expect(hslToRGB("hsl(359, 100%, 100%)")).toStrictEqual([255, 255, 255]);
});

test("HSL mid boundary #40bfbf", () => {
  expect(hslToRGB("hsl(180, 50%, 50%)")).toStrictEqual([64, 191, 191]);
});
