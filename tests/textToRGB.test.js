import { textToRGB } from "../helpers";

test("Empty string", () => {
  expect(textToRGB("")).toStrictEqual(null);
});
