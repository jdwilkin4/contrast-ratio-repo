import { textToRGB, calculateRatio, $ } from "./helpers.js";

const fgColorInput = $("#foreground-color"),
  bgColorInput = $("#background-color"),
  fgSwatch = $("#swatch-one"),
  bgSwatch = $("#swatch-two"),
  ratioResult = $("#contrast-ratio-result"),
  warning = $("#warning-box"),
  info = $("#info-box"),
  textSmDouble = $("#text-sm-double"),
  textSmTriple = $("#text-sm-triple"),
  textLgDouble = $("#text-lg-double"),
  textLgTriple = $("#text-lg-triple"),
  graphicsDouble = $("#graphics-double"),
  labels = $(".checks-container span", true),
  failMsg = "fail",
  passMsg = "pass";

const displayMessage = (div) => {
  div.classList.remove("hidden");
};

const hideMessage = (div) => {
  div.classList.add("hidden");
};

const clearMessages = () => {
  hideMessage(warning);
  hideMessage(info);
};

const updateSwatch = (el) => {
  if (textToRGB(el.value) !== null) {
    if (el === fgColorInput) {
      fgSwatch.style.backgroundColor = el.value;
    } else {
      bgSwatch.style.backgroundColor = el.value;
    }
  }
};

const updateLabel = (el, clsName) => {
  el.className = clsName;
  el.textContent =
    clsName[0].toUpperCase() + clsName.split("").slice(1).join("");
};

const handleChange = (e) => {
  clearMessages();
  updateSwatch(e.currentTarget);
};

const displayResult = (event) => {
  // stop, when any of the two inputs is empty
  if (!(fgColorInput.value && bgColorInput.value)) {
    // however, display info message when one input is given
    if (fgColorInput.value || bgColorInput.value) {
      displayMessage(info);
    }
    return;
  }

  let fgRGB = textToRGB(fgColorInput.value);
  let bgRGB = textToRGB(bgColorInput.value);
  let ratio = 0;

  if (fgRGB !== null && bgRGB !== null) {
    ratio = calculateRatio(fgRGB, bgRGB);
  } else {
    displayMessage(warning);
  }
  // display ratio result
  ratioResult.innerHTML = ratio.toFixed(2);

  // set all labels as fail
  labels.forEach((label) => {
    updateLabel(label, failMsg);
  });

  // modify labels accordingly
  if (ratio >= 3) {
    updateLabel(textLgDouble, passMsg);
    updateLabel(graphicsDouble, passMsg);
  }

  if (ratio >= 4.5) {
    updateLabel(textSmDouble, passMsg);
    updateLabel(textLgTriple, passMsg);
  }

  if (ratio >= 7) {
    updateLabel(textSmTriple, passMsg);
  }
};

fgColorInput.oninput = handleChange;
bgColorInput.oninput = handleChange;
fgColorInput.onblur = displayResult;
bgColorInput.onblur = displayResult;

document.querySelector("#copyright").innerText = new Date().getFullYear();
