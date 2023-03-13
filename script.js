let ACTIVE_MODE = "color";

const sketch = document.getElementById("sketch");
const colorPicker = document.getElementById("paintColor");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraseBtn = document.getElementById("eraseBtn");
const gridSizeText = document.getElementById("gridSizeText");
const sizeSlider = document.getElementById("sizeSlider");
const clearBtn = document.getElementById("clearBtn");
const modeButtons = document.querySelectorAll(".mode");

colorPicker.addEventListener("click", (e) => setActiveMode(e.target));
rainbowBtn.addEventListener("click", (e) => setActiveMode(e.target));
eraseBtn.addEventListener("click", (e) => setActiveMode(e.target));
clearBtn.addEventListener("click", () => clearSketch());
sizeSlider.addEventListener("input", () => {
  gridSizeText.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
  drawSketchPixels(sizeSlider.value);
});

let mouseDown = 0;
document.body.onmousedown = () => (mouseDown = 1);
document.body.onmouseup = () => (mouseDown = 0);

function drawSketchPixels(size2D) {
  removeSketchPixels();
  sketch.setAttribute(
    "style",
    `grid-template-rows: repeat(${size2D}, 1fr);
  grid-template-columns: repeat(${size2D}, 1fr)`
  );
  createSketchPixels(size2D);
}

function createSketchPixels(size2D) {
  for (let i = 0; i < size2D ** 2; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("sketch-pixel");
    // Fill color on hover only if mouse is down
    pixel.addEventListener("mouseover", () => {
      if (mouseDown) fillColor(pixel);
    });
    pixel.addEventListener("mousedown", () => {
      fillColor(pixel);
    });
    sketch.appendChild(pixel);
  }
}

function removeSketchPixels() {
  while (sketch.firstChild) {
    sketch.removeChild(sketch.firstChild);
  }
}

function setActiveMode(button) {
  Array.from(modeButtons).forEach((modeButton) => {
    console.log(modeButton);
    if (modeButton === colorPicker) {
      modeButton.classList.remove("paintColor--active");
    } else {
      modeButton.classList.remove("btn-interface--active");
    }
  });

  if (button === colorPicker) {
    colorPicker.classList.add("paintColor--active");
    ACTIVE_MODE = "color";
  } else if (button === rainbowBtn) {
    rainbowBtn.classList.add("btn-interface--active");
    ACTIVE_MODE = "rainbow";
  } else if (button === eraseBtn) {
    eraseBtn.classList.add("btn-interface--active");
    ACTIVE_MODE = "erase";
  }
}

function fillColor(div) {
  if (ACTIVE_MODE === "color") div.style.backgroundColor = colorPicker.value;
  else if (ACTIVE_MODE === "rainbow") {
    const R = Math.floor(Math.random() * 255);
    const G = Math.floor(Math.random() * 255);
    const B = Math.floor(Math.random() * 255);
    div.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
  } else if (ACTIVE_MODE === "erase") div.removeAttribute("style");
}

function clearSketch() {
  const pixels = sketch.children;
  Array.from(pixels).forEach((pixel) => {
    pixel.removeAttribute("style");
  });
}

window.onload = () => {
  drawSketchPixels(sizeSlider.value);
  setActiveMode(colorPicker);
};
