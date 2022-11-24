import { rgbInputToRGBNumbers, isValidRGB } from "../helpers";

test("RGB low boundary #000", () => {
  expect(rgbInputToRGBNumbers("rgb(0, 0, 0)")).toStrictEqual([0, 0, 0]);
});

test("RGB high boundary #fff", () => {
  expect(rgbInputToRGBNumbers("rgb(255, 255, 255)")).toStrictEqual([
    255, 255, 255,
  ]);
});

test("valid RGB", () => {
  expect(isValidRGB("rgb(1, 254, 0)")).toStrictEqual(true);
});

test("RGB out of range value -1", () => {
  expect(isValidRGB("rgb(-1, 0, 0)")).toStrictEqual(false);
});

test("RGB out of range value 256", () => {
  expect(isValidRGB("rgb(256, 0, 0)")).toStrictEqual(false);
});

test("RGB , missing", () => {
  expect(isValidRGB("rgb(256 0, 0)")).toStrictEqual(false);
});
