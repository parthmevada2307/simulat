let buttons = [];
let buttonLabels = [
  "Learn to Launch",    // Stage 1
  "Defy Gravity",       // Stage 2
  "Master Your Aim"     // Stage 3
];

let buttonColors = ["yellow", "cyan", "red"]; // Blue, Yellow, Green
let osc; // oscillator for click sound
let bgImage; // background image
let clickSound;

let layout = {};

function preload() {
  bgImage = loadImage("projectile motion bg.jpg");
  clickSound = loadSound("button-pressed-38129.mp3");
}

function buildLayout() {
  let s = min(windowWidth / 1200, windowHeight / 800);
  s = max(s, 0.4); // Don't scale too small

  let titleSize = max(52 * s, 28);
  let titleY = max(91 * s, 40);

  let btnWidth = max(400 * s, windowWidth * 0.8);
  let btnHeight = max(70 * s, 50);
  let spacing = max(50 * s, 30);
  let startY = max(320 * s, titleY + 80);

  buttons = [];
  for (let i = 0; i < 3; i++) {
    buttons.push({
      x: windowWidth / 2 - btnWidth / 2,
      y: startY + i * (btnHeight + spacing),
      w: btnWidth,
      h: btnHeight,
      label: buttonLabels[i],
      color: buttonColors[i]
    });
  }

  layout = {
    scale: s,
    titleSize: titleSize,
    titleY: titleY,
    btnTextSize: max(18 * s, 14)
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  textFont("Helvetica");

  buildLayout();

  osc = new p5.Oscillator('square');
  osc.freq(1000);
  osc.amp(0);
  osc.start();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buildLayout();
}

function draw() {
  background(bgImage);
  fill(0, 100);
  rect(0, 0, width, height);

  fill('yellow');
  textAlign(CENTER, TOP);
  textSize(layout.titleSize);
  text("Flight With Physics", width / 2, layout.titleY);

  for (let btn of buttons) {
    drawButton(btn);
  }
}

function drawButton(btn) {
  noStroke();
  fill(btn.color);
  rect(btn.x, btn.y, btn.w, btn.h, 20);

  fill(0);
  textSize(layout.btnTextSize);
  textAlign(CENTER, CENTER);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function mouseClicked() {
  handleInteraction(mouseX, mouseY);
}

function handleInteraction(px, py) {
  for (let btn of buttons) {
    if (
      px > btn.x &&
      px < btn.x + btn.w &&
      py > btn.y &&
      py < btn.y + btn.h
    ) {
      playClickSound();

      if (btn.label === "Learn to Launch") {
        window.open("https://parthmevada2307.github.io/simul1/");
      }
      
      if (btn.label === "Master Your Aim") {
        window.open("https://parthmevada2307.github.io/simulat3/");
      }
      
      if (btn.label === "Defy Gravity") {
        window.open("https://parthmevada2307.github.io/simulat2/");
      }
    }
  }
}

function playClickSound() {
  if (clickSound.isPlaying()) {
    clickSound.stop();
  }
  clickSound.play();
}
