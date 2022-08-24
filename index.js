const foregroundColor = document.getElementById("foreground-color");
const backgroundColor = document.getElementById("background-color");
const foregroundSwatch = document.getElementById("swatch-one");
const backgroundSwatch = document.getElementById("swatch-two");
const ratioResult = document.getElementById("contrast-ratio-result");
const warningBox = document.getElementById("warning-box");

const hexRegex = /^#([A-Fa-f0-9]{6})$/;
const hexRegex3Digit = /^#[a-fA-F0-9]{3}$/;
const rgbaRegex = /^rgba.*/i;
const hslRegex = /^hsl.*/i;
const hslaRegex = /^hsla.*/i;

const shortToFullHex = (hexColor) => {
  return [...hexColor].map((x, index) => (index != 0 ? x + x : x)).join("");
};

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

const hslaToCloseRGB = (hslaColor) => {
  const formattedHSLA = hslaColor.replace(/[\(\)\sA-Za-z%]/g, "").split(",");
  const opacity = formattedHSLA.pop();
  const hslaToRGBA =
    hslToRGB(formattedHSLA.join(",")).join(",") + `,${opacity}`;
  return rgbaToCloseRGB(hslaToRGBA);
};

const isValidRGB = (color) => {
  const rgbRegex = /^rgb\(\s?\d{1,3},\s?\d{1,3},\s?\d{1,3}\)$/i;
  if (rgbRegex.test(color)) {
    return rgbInputToRGBNumbers(color).every((v) => 0 <= v && v <= 255);
  } else return false;
};

const showErrorMessage = () => {
  warningBox.classList.remove("hidden");
};

const hideErrorMessage = () => {
  warningBox.classList.add("hidden");
};

const isNotEmpty = (value) => {
  return value !== null && value !== "";
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

const colorFormatRatio = (color1, color2, convertRatio) => {
  const RGBColor1 = convertRatio(color1);
  const RGBColor2 = convertRatio(color2);
  return calculateRatio(RGBColor1, RGBColor2);
};

const updateSwatchColor = (swatch, color) => {
  if (
    hexRegex.test(color) ||
    isValidRGB(color) ||
    rgbaRegex.test(color) ||
    hslRegex.test(color) ||
    hslaRegex.test(color) ||
    hexRegex3Digit.test(color)
  ) {
    swatch.style.backgroundColor = color;
  }
};

const displayColor = () => {
  hideErrorMessage();
  let firstColor = foregroundColor.value;
  let secondColor = backgroundColor.value;
  updateSwatchColor(foregroundSwatch, firstColor);
  updateSwatchColor(backgroundSwatch, secondColor);
};

const displayResult = () => {
  hideErrorMessage();

  let firstColor = foregroundColor.value;
  let secondColor = backgroundColor.value;

  // CASE two Hexes
  if (/^#.*/.test(firstColor) && /^#.*/.test(secondColor)) {
    if (firstColor.length === 7 && secondColor.length === 7) {
      if (hexRegex.test(firstColor) && hexRegex.test(secondColor)) {
        ratioResult.innerHTML = colorFormatRatio(
          firstColor,
          secondColor,
          hexToRGB
        );
      }
    }
    if (firstColor.length >= 7 && secondColor.length >= 7) {
      if (!hexRegex.test(firstColor) || !hexRegex.test(secondColor)) {
        showErrorMessage();
      }
    } else if (firstColor.length < 7 || secondColor.length < 7) {
      ratioResult.innerHTML = "";
    }
  } else if (
    hexRegex3Digit.test(firstColor) &&
    hexRegex3Digit.test(secondColor)
  ) {
    ratioResult.innerHTML = colorFormatRatio(
      shortToFullHex(firstColor),
      shortToFullHex(secondColor),
      hexToRGB
    );
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
  else if (isNotEmpty(firstColor) && isNotEmpty(secondColor)) {
    if (isValidRGB(firstColor) && isValidRGB(secondColor)) {
      ratioResult.innerHTML = colorFormatRatio(
        firstColor,
        secondColor,
        rgbInputToRGBNumbers
      );
    } else {
      ratioResult.innerHTML = "";
      showErrorMessage();
    }
  }

  //CASE two HSLAs
  if (hslaRegex.test(firstColor) && hslaRegex.test(secondColor)) {
    ratioResult.innerHTML = colorFormatRatio(
      firstColor,
      secondColor,
      hslaToCloseRGB
    );
  }
  //CASE two HSLs
  else if (hslRegex.test(firstColor) && hslRegex.test(secondColor)) {
    ratioResult.innerHTML = colorFormatRatio(firstColor, secondColor, hslToRGB);
  }
};

foregroundColor.oninput = displayColor;
backgroundColor.oninput = displayColor;
foregroundColor.onblur = displayResult;
backgroundColor.onblur = displayResult;

document.querySelector("#copyright").innerText = new Date().getFullYear();
