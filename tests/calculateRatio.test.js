import { calculateRatio } from "../helpers";

test("#fff & #000", () => {
  expect(calculateRatio([0, 0, 0], [255, 255, 255])).toBe(21);
});

test("#fff & #000", () => {
  expect(calculateRatio([0, 0, 0], [0, 0, 0])).toBe(1);
});

test("#000 & #7F7F7F", () => {
  expect(
    Math.trunc(calculateRatio([0, 0, 0], [127, 127, 127]) * 100000000)
  ).toBe(524461514);
});

test("#fff & #7F7F7F", () => {
  expect(
    Math.trunc(calculateRatio([255, 255, 255], [127, 127, 127]) * 100000000)
  ).toBe(400410695);
});
