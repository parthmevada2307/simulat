let buttons = [];
let buttonLabels = [
  "Learn to Launch",    // Stage 1
  "Defy Gravity",       // Stage 2
  "Master Your Aim"     // Stage 3
];


let buttonColors = ["yellow", "cyan", "red"]; // Blue, Yellow, Green
let buttonWidths = [400, 400, 400]; // Increased widths

let osc; // oscillator for click sound
let bgImage; // background image
let clickSound;

function preload() {
  bgImage = loadImage("projectile motion bg.jpg");
  clickSound = loadSound("button-pressed-38129.mp3");
}

function setup() {
  createCanvas(1200, 800);
  textFont("Helvetica");

  let btnHeight = 70;
  let spacing = 50;

  for (let i = 0; i < 3; i++) {
    let btnWidth = buttonWidths[i];
    buttons.push({
      x: width / 2 - btnWidth / 2,
      y: 320 + i * (btnHeight + spacing),
      w: btnWidth,
      h: btnHeight,
      label: buttonLabels[i],
      color: buttonColors[i]
    });
  }

  osc = new p5.Oscillator('square');
  osc.freq(1000);
  osc.amp(0);
  osc.start();
}

function draw() {
  background(bgImage);
  fill(0, 100);
  rect(0, 0, width, height);

  fill('yellow');
  textAlign(CENTER, TOP);
  textSize(52);
  text("Flight With Physics", width / 2, 91);

  
  for (let btn of buttons) {
    drawButton(btn);
  }
}

function drawButton(btn) {
  noStroke();
  fill(btn.color);
  rect(btn.x, btn.y, btn.w, btn.h, 20);

  fill(0);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function mousePressed() {
  for (let btn of buttons) {
    if (
      mouseX > btn.x &&
      mouseX < btn.x + btn.w &&
      mouseY > btn.y &&
      mouseY < btn.y + btn.h
    ) {
      playClickSound();

     
      if (btn.label === "Learn to Launch") {
        window.open("https://parthmevada2307.github.io/simul1/");
      }
      
       if (btn.label === "Master Your Aim" 
) {
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
