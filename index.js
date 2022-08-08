//CALCULATIONS

//UNIT1

const hexToRGB = (hexColor) => {
    const R = parseInt(hexColor.slice(1, 3), 16);
    const G = parseInt(hexColor.slice(3, 5), 16);
    const B = parseInt(hexColor.slice(5), 16);
    return [R, G, B];
  }

//UNIT2
  
const getLuminance = (RGBarray) => {
    //convert 8bit colors to
    //RsRGB, GsRGB BsRGB
    const XsRGBarray = RGBarray.map(elem => elem / 255);

    //use function to get r, g, b for final formula
    //UNIT2.1
    const getRGBCoefficient = (XsRGB) => {
    if (XsRGB <= 0.03928) {
        return XsRGB / 12.92;
    }
    else {
        return Math.pow((XsRGB + 0.055) / 1.055, 2.4);
    }
    }

    //array of multipliers, for r, g, b respectively
    //L = 0.2126 * R + 0.7152 * G + 0.0722 * B
    const multipliers = [0.2126, 0.7152, 0.0722];

    let luminance = 0;

    for (let i = 0; i < multipliers.length; i++) {
        luminance += getRGBCoefficient(XsRGBarray[i]) * multipliers[i];
    }

    return luminance;
}

const twoHexesRatio = (color1, color2) => {
    //STEP1 convert hex into rgb using UNIT1
    const RGBColor1 = hexToRGB(color1);
    const RGBColor2 = hexToRGB(color2);
    //STEP2 get relative luminance for each of colors using UNIT2
    const color1Luminance = getLuminance(RGBColor1);
    const color2Luminance = getLuminance(RGBColor2);
    /*STEP3 calculate result value
    (L1 + 0.05) / (L2 + 0.05), whereby:
    L1 is the relative luminance of the lighter of the colors, and
    L2 is the relative luminance of the darker of the colors.
    */
    let [lighterLum, darkerLum] = [color1Luminance, color2Luminance];
    if (darkerLum > lighterLum) {
      [lighterLum, darkerLum] = [darkerLum, lighterLum];
    }
    return ((lighterLum + 0.05) / (darkerLum + 0.05)).toFixed(2);
}
