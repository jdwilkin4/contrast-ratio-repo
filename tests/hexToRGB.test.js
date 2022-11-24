import { hexToRGB, hexRegex, hexRegex3Digit } from "../helpers";

test("Valid HEX", () => {
  expect(hexRegex.test("#F0F0F0")).toStrictEqual(true);
  expect(hexRegex3Digit.test("#F0F")).toStrictEqual(true);
});

test("Only hashtag", () => {
  expect(hexRegex.test("#")).toStrictEqual(false);
  expect(hexRegex3Digit.test("#")).toStrictEqual(false);
});

test("No hashtag", () => {
  expect(hexRegex.test("F0F0F0")).toStrictEqual(false);
  expect(hexRegex3Digit.test("F0F0F0")).toStrictEqual(false);
});

test("Two hashtags", () => {
  expect(hexRegex.test("##")).toStrictEqual(false);
  expect(hexRegex3Digit.test("##")).toStrictEqual(false);
});

test("HEX too long", () => {
  expect(hexRegex.test("#F0F0F0F")).toStrictEqual(false);
  expect(hexRegex3Digit.test("#F0F0")).toStrictEqual(false);
});

test("HEX too short", () => {
  expect(hexRegex.test("#F0F0F")).toStrictEqual(false);
  expect(hexRegex3Digit.test("#F0")).toStrictEqual(false);
});

test("HEX #FFFFFF", () => {
  expect(hexToRGB("#FFFFFF")).toStrictEqual([255, 255, 255]);
});

test("HEX #000000", () => {
  expect(hexToRGB("#000000")).toStrictEqual([0, 0, 0]);
});
