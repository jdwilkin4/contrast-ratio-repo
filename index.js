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

const hslToRGB = (hslColor) => {
  const dataForCalculation = hslColor
    .replace(/[\(\)\sA-Za-z%]/g, "")
    .split(",")
    .map((hslValue, index) => {
      return index === 0 ? Number(hslValue) : Number(hslValue) / 100;
    });
  //console.log(dataForCalculation);
  //C = (1 - |2L - 1|) * S
  const Chroma =
    (1 - Math.abs(2 * dataForCalculation[2] - 1)) * dataForCalculation[1];
  const HuePrime = dataForCalculation[0] / 60;
  //X = C * (1 |H' mod 2 - 1|)
  const X = Chroma * (1 - Math.abs((HuePrime % 2) - 1));
  //console.log(Chroma);
  //console.log(HuePrime);
  //console.log(X);
  let RGBresult = [];
  if (HuePrime <= 1) {
    RGBresult = [Chroma, X, 0];
  } else if (HuePrime > 1 && HuePrime <= 2) {
    RGBresult = [X, Chroma, 0];
  } else if (HuePrime > 2 && HuePrime <= 3) {
    RGBresult = [0, Chroma, X];
  } else if (HuePrime > 3 && HuePrime <= 4) {
    RGBresult = [0, X, Chroma];
  } else if (HuePrime > 4 && HuePrime <= 5) {
    RGBresult = [X, 0, Chroma];
  } else {
    RGBresult = [Chroma, 0, X];
  }
  //console.log(RGBresult)
  //m = L - (C / 2)
  const adjustLightness = dataForCalculation[2] - Chroma / 2;
  //console.log(adjustLightness);
  return RGBresult.map((RGBvalue) =>
    Math.round((RGBvalue + adjustLightness) * 255)
  );
};

const rgbInputToRGBNumbers = (rgbColor) => {
  [R, G, B] = rgbColor
    .replace(/[^\d,]/g, "")
    .split(",")
    .map((RGBValue) => parseInt(RGBValue));
  return [R, G, B];
};

// Determine the equivalent opaque RGB color
// for a given partially transparent RGB color against a white background
const rgbaToCloseRGB = (rgbaColor) => {
  const bg = [255, 255, 255];
  [R, G, B, o] = rgbaColor
    .replace(/[^\d,.]/g, "")
    .split(",")
    .map((el) => parseFloat(el));
  // Y = p * T + (1 - p) * B , where:
  // p is the opacity of the top layer
  // T is the rgb number of the top layer color
  // B is the rgb number of the fully opaque bottom layer
  // Y is the rgb number of the equivalent fully opaque color
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

const twoHSLRatio = (color1, color2) => {
  // have many repetitions here and in twoHexesRatio
  const HSLColor1 = hslToRGB(color1);
  const HSLColor2 = hslToRGB(color2);
  const color1Luminance = getLuminance(HSLColor1);
  const color2Luminance = getLuminance(HSLColor2);
  let [lighterLum, darkerLum] = [color1Luminance, color2Luminance];
  if (darkerLum > lighterLum) {
    [lighterLum, darkerLum] = [darkerLum, lighterLum];
  }
  return ((lighterLum + 0.05) / (darkerLum + 0.05)).toFixed(2);
};

const colorFormatRatio = (color1, color2, convertRatio) => {
  const RGBColor1 = convertRatio(color1);
  const RGBColor2 = convertRatio(color2);
  return calculateRatio(RGBColor1, RGBColor2);
};

const displayResult = () => {
  let firstColor = foregroundColor.value;
  let secondColor = backgroundColor.value;
  const rgbRegex = /^rgb.*/i;
  const rgbaRegex = /^rgba.*/i;
  const hslRegex = /^hsl.*/i;
  const hslaRegex = /^hsla.*/i;
  if (
    firstColor.length === 7 ||
    rgbRegex.test(firstColor) ||
    rgbaRegex.test(firstColor)
  ) {
    foregroundSwatch.style.backgroundColor = firstColor;
  }
  if (
    secondColor.length === 7 ||
    rgbRegex.test(secondColor) ||
    rgbaRegex.test(secondColor)
  ) {
    backgroundSwatch.style.backgroundColor = secondColor;
  }
  // CASE two Hexes
  if (firstColor.length === 7 && secondColor.length === 7) {
    ratioResult.innerHTML = colorFormatRatio(firstColor, secondColor, hexToRGB);
  }
  // CASE two RGBAs
  else if (rgbaRegex.test(firstColor) && rgbaRegex.test(secondColor)) {
    ratioResult.innerHTML = colorFormatRatio(
      firstColor,
      secondColor,
      rgbaToCloseRGB
    );
  }
  // CASE two RGBs
  else if (rgbRegex.test(firstColor) && rgbRegex.test(secondColor)) {
    ratioResult.innerHTML = colorFormatRatio(
      firstColor,
      secondColor,
      rgbInputToRGBNumbers
    );
  }
  //CASE two HSLs
  else if (hslRegex.test(firstColor) && hslRegex.test(secondColor)) {
    ratioResult.innerHTML = colorFormatRatio(firstColor, secondColor, hslToRGB);
  }
};

foregroundColor.oninput = displayResult;
backgroundColor.oninput = displayResult;

document.querySelector("#copyright").innerText = new Date().getFullYear();
