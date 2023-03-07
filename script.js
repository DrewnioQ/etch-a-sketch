const sketchContainer = document.querySelector(".sketch");
const clearBtn = document.getElementById("clearBtn");

function drawPixels(pixelNum) {
  const pixelCount = pixelNum ** 2;

  sketchContainer.setAttribute(
    "style",
    `grid-template-rows: repeat(${pixelNum}, 1fr);
  grid-template-columns: repeat(${pixelNum}, 1fr)`
  );

  for (let i = 0; i < pixelCount; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("sketch-pixel");
    sketchContainer.appendChild(emptyDiv);
  }
}

function main() {
  drawPixels(16);
}
main();
