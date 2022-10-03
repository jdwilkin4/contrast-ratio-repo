// change to true if you want the test to run
// results will be displayed in the console
export const RUN_TESTS = true;

const RGBtestCases = [
  // [Case, Value, Expected result]

  ["HEX", "#FFFFFF", true],
  ["HEX no hash", "FFFFFF", false],
  ["HEX invalid", "#FFFFFX", false],
  ["HEX too long", "#FFFFFFF", false],
  ["HEX too short", "#FFFF", false],

  ["HEX3", "#FFFFFF", true],
  ["HEX3 invalid", "#FFX", false],
  ["HEX3 no hash", "FFF", false],
  ["HEX3 too short", "#FF", false],

  // add more test cases
];

const contrastRatioTestCases = [
  // [Foreground, Background, Expected result]

  ["rgb(100, 1, 233)", "#AAAB1C", 3.14],
  ["hsl(240, 100%, 50%)", "#AAAB1C", 3.5],

  // add more test cases
];

export function testContrastRatio(getRatio, getRGB) {
  const headers = [
    "Foreground",
    "Background",
    "Expected",
    "Actual",
    "Ratio Match",
  ];
  const table = contrastRatioTestCases.map((testCase) => {
    const [fg, bg, expectedResult] = testCase;
    const actualResult = getRatio(getRGB(fg), getRGB(bg));
    const result = actualResult === expectedResult ? "✅" : "❌";
    return {
      Foreground: fg,
      Background: bg,
      Expected: expectedResult,
      Actual: actualResult,
      "Ratio Match": result,
    };
  });
  console.log("\n~~~ Contrast Ratio Test ~~~\n");
  console.table(table, headers);
}

export function testConversion(fn) {
  const headers = ["Case", "Value", "Expected", "Actual", "Expected Match"];
  const table = RGBtestCases.map((testCase) => {
    const [name, value, expectedResult] = testCase;
    const actualResult = fn(value) != null ? true : false;
    const result = actualResult === expectedResult ? "✅" : "❌";
    return {
      Case: name,
      Value: value,
      Expected: expectedResult,
      Actual: actualResult,
      "Expected Match": result,
    };
  });
  console.log("\n~~~ Format Conversion Test ~~~\n");
  console.table(table, headers);
}
