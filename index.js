const foregroundColor = document.getElementById("foreground-color");
const backgroundColor = document.getElementById("background-color");
const foregroundSwatch = document.getElementById("swatch-one");
const backgroundSwatch = document.getElementById("swatch-two");
const ratioResult = document.getElementById("contrast-ratio-result");

const hexToRGB = (hexColor) => {
  const R = parseInt(hexColor.slice(1, 3), 16);
  const G = parseInt(hexColor.slice(3, 5), 16);
  const B = parseInt(hexColor.slice(5), 16);
  return [R, G, B];
};

const rgbToRGB = (rgbColor) => {
  [R, G, B] = rgbColor
    .replace(/[^\d,]/g, "")
    .split(",")
    .map((el) => parseInt(el));
  return [R, G, B];
};

// On -white- color background
const rgbaToCloseRGB = (rgbaColor) => {
  const bg = [255, 255, 255];
  [R, G, B, o] = rgbaColor
    .replace(/[^\d,.]/g, "")
    .split(",")
    .map((el) => parseFloat(el));
  return [R, G, B].map((colFg, idx) =>
    Math.ceil(o * colFg + (1 - o) * bg[idx])
  );
};

const getLuminance = (RGBarray) => {
  //convert 8bit colors to
  //RsRGB, GsRGB BsRGB
  const XsRGBarray = RGBarray.map((elem) => elem / 255);

  const getRGBCoefficient = (XsRGB) => {
    if (XsRGB <= 0.03928) {
      return XsRGB / 12.92;
    } else {
      return Math.pow((XsRGB + 0.055) / 1.055, 2.4);
    }
  };

  //array of multipliers, for r, g, b respectively
  //L = 0.2126 * R + 0.7152 * G + 0.0722 * B
  const multipliers = [0.2126, 0.7152, 0.0722];

  let luminance = 0;

  for (let i = 0; i < multipliers.length; i++) {
    luminance += getRGBCoefficient(XsRGBarray[i]) * multipliers[i];
  }

  return luminance;
};

const calculateRatio = (color1, color2) => {
  const color1Luminance = getLuminance(color1);
  const color2Luminance = getLuminance(color2);
  /* (L1 + 0.05) / (L2 + 0.05), whereby:
    L1 is the relative luminance of the lighter of the colors, and
    L2 is the relative luminance of the darker of the colors. */
  let lighterLum = Math.max(color1Luminance, color2Luminance);
  let darkerLum = Math.min(color1Luminance, color2Luminance);
  return ((lighterLum + 0.05) / (darkerLum + 0.05)).toFixed(2);
};

const twoHexesRatio = (color1, color2) => {
  const RGBColor1 = hexToRGB(color1);
  const RGBColor2 = hexToRGB(color2);
  return calculateRatio(RGBColor1, RGBColor2);
};

const twoRgbsRatio = (color1, color2) => {
  const RGBColor1 = rgbToRGB(color1);
  const RGBColor2 = rgbToRGB(color2);
  return calculateRatio(RGBColor1, RGBColor2);
};

const twoRgbasRatio = (color1, color2) => {
  const RGBColor1 = rgbaToCloseRGB(color1);
  const RGBColor2 = rgbaToCloseRGB(color2);
  return calculateRatio(RGBColor1, RGBColor2);
};

const displayResult = () => {
  let firstColor = foregroundColor.value;
  let secondColor = backgroundColor.value;
  const rgbRegex = /^rgb.*/i;
  const rgbaRegex = /^rgba.*/i;
  if (firstColor.length === 7) {
    foregroundSwatch.style.backgroundColor = firstColor;
  }
  if (secondColor.length === 7) {
    backgroundSwatch.style.backgroundColor = secondColor;
  }
  // CASE two Hexes
  if (firstColor.length === 7 && secondColor.length === 7) {
    ratioResult.innerHTML = twoHexesRatio(firstColor, secondColor);
  }
  // CASE two RGBAs
  else if (rgbaRegex.test(firstColor) && rgbaRegex.test(secondColor)) {
    console.log(twoRgbasRatio(firstColor, secondColor));
    ratioResult.innerHTML = twoRgbasRatio(firstColor, secondColor);
  }
  // CASE two RGBs
  else if (rgbRegex.test(firstColor) && rgbRegex.test(secondColor)) {
    ratioResult.innerHTML = twoRgbsRatio(firstColor, secondColor);
  }
};

foregroundColor.oninput = displayResult;
backgroundColor.oninput = displayResult;

document.querySelector("#copyright").innerText = new Date().getFullYear();
