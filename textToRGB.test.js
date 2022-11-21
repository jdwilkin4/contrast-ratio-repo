import { textToRGB } from "./helpers";

const RGBtestCases = [
  // [Case, Value, Expected result]

  ["Only hashtag", "#", null],
  ["Two hashtags", "##FFFFFF", null],
  ["Empty string", "", null],

  // Full HEX format
  ["HEX", "#FFFFFF", [255, 255, 255]],
  ["HEX", "#000000", [0, 0, 0]],
  ["HEX no hash", "FFFFFF", null],
  ["HEX out of range", "#FFFFFX", null],
  ["HEX too long", "#FFFFFFF", null],
  ["HEX too short", "#FFFF", null],

  // Short HEX format
  ["HEX3", "#FFF", [255, 255, 255]],
  ["HEX3", "#000", [0, 0, 0]],
  ["HEX3 invalid", "#FFX", null],
  ["HEX3 no hash", "FFF", null],
  ["HEX3 too short", "#FF", null],

  // HSL format
  ["HSL low boundary #000", "hsl(0, 0%, 0%)", [0, 0, 0]],
  ["HSL high boundary #fff", "hsl(0, 100%, 100%)", [255, 255, 255]],
  ["HSL high boundary #fff", "hsl(359, 0%, 100%)", [255, 255, 255]],
  ["HSL high boundary #fff", "hsl(359, 100%, 100%)", [255, 255, 255]],
  ["HSL mid boundary #40bfbf", "hsl(180, 50%, 50%)", [64, 191, 191]],
  ["HSL both % missing", "hsl(180, 50, 50)", null],
  ["HSL saturation % missing", "hsl(180, 50, 50%)", null],
  ["HSL lightness % missing", "hsl(180, 50%, 50)", null],
  ["HSL ( missing", "hsl180, 50%, 50%)", null],
  ["HSL , missing", "hsl(180 50%, 50%)", null],

  // RGB format
  ["RGB low boundary #000", "rgb(0, 0, 0)", [0, 0, 0]],
  ["RGB high boundary #fff", "rgb(255, 255, 255)", [255, 255, 255]],
  ["RGB out of range value -1", "rgb(-1, 0, 0)", null],
  ["RGB out of range value 256", "rgb(256, 0, 0)", null],
  ["RGB , missing", "rgb(256 0, 0)", null],

  // Named colors
  ["black", "black", [0, 0, 0]],
  ["white", "white", [255, 255, 255]],
  ["mistyrose", "mistyrose", [255, 228, 225]],
  ["unknown color", "block", null],
];

RGBtestCases.forEach(([desc, input, outcome]) => {
  test(desc, () => {
    expect(textToRGB(input)).toStrictEqual(outcome);
  });
});
