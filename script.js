const canevas = document.querySelector("#draw");
const ctx = canevas.getContext("2d");
canevas.width = window.innerWidth;
canevas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 50;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) {
    return;
  }

  ctx.strokeStyle = `hsl(${hue},100%,50%)`;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
  hue++;
  if (hue > 360) {
    hue = 0;
  }

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}
canevas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canevas.addEventListener("mousemove", draw);

canevas.addEventListener("mouseup", () => (isDrawing = false));
canevas.addEventListener("mouseout", () => (isDrawing = false));
