const DEFAULT_SIZE2D = 16;

const sketchContainer = document.getElementById("sketchContainer");
const clearBtn = document.getElementById("clearBtn");

clearBtn.onclick = () => clearSketch();

function drawPixels(size2D) {
  sketchContainer.setAttribute(
    "style",
    `grid-template-rows: repeat(${size2D}, 1fr);
  grid-template-columns: repeat(${size2D}, 1fr)`
  );

  createDivs(size2D);
}

function createDivs(size2D) {
  for (let i = 0; i < size2D ** 2; i++) {
    const emptyDiv = document.createElement("div");

    emptyDiv.classList.add("sketch-pixel");

    emptyDiv.addEventListener("mousedown", () => {
      fillColor(emptyDiv, "red");
    });
    sketchContainer.appendChild(emptyDiv);
  }
}

function fillColor(div, color) {
  div.style.backgroundColor = `${color}`;
}

function clearSketch() {
  const pixels = sketchContainer.children;
  Array.from(pixels).forEach((pixel) => {
    pixel.style.backgroundColor = "white";
  });
}

function main() {
  drawPixels(16);
}
main();
