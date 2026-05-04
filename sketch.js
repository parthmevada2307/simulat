let buttons = [];
let buttonLabels = [
  "Learn to Launch",    // Stage 1
  "Defy Gravity",       // Stage 2
  "Master Your Aim"     // Stage 3
];
let osc; // oscillator for click sound
let bgImage; // background image
let clickSound;

function preload() {
  clickSound = loadSound("button-pressed-38129.mp3");
}

function setup() {
  setTimeout(() => { document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  textFont("Arial");
  buildDOMLayout();

  osc = new p5.Oscillator('square');
  osc.freq(1000);
  osc.amp(0);
  osc.start();
}

function buildDOMLayout() {
  for (let btn of buttons) {
    if (btn.dom) btn.dom.remove();
  }
  buttons = [];

  let s = min(windowWidth / 1200, windowHeight / 800);
  s = max(s, 0.45);

  let titleY = max(91 * s, 40);
  let btnWidth = max(400 * s, windowWidth * 0.8);
  let btnHeight = max(70 * s, 50);
  let spacing = max(50 * s, 30);
  let startY = max(320 * s, titleY + 80);

  let btnData = [
    { label: "Learn to Launch", col: color(100, 200, 255), url: "https://parthmevada2307.github.io/simul1/" },
    { label: "Defy Gravity", col: color(255, 100, 150), url: "https://parthmevada2307.github.io/simulat2/" },
    { label: "Master Your Aim", col: color(100, 255, 150), url: "https://parthmevada2307.github.io/simulat3/" }
  ];

  for (let i = 0; i < 3; i++) {
    let b = btnData[i];
    let btn = createButton(b.label);
    
    btn.position(windowWidth / 2 - btnWidth / 2, startY + i * (btnHeight + spacing));
    btn.size(btnWidth, btnHeight);
    
    // Convert p5 color to hex/rgba for CSS
    let r = red(b.col); let g = green(b.col); let blueColor = blue(b.col);
    btn.style('background-color', `rgb(${r},${g},${blueColor})`);
    btn.style('color', '#000');
    btn.style('border', 'none');
    btn.style('border-radius', '20px');
    btn.style('font-family', 'Arial, sans-serif');
    btn.style('font-size', `${max(28 * s, 18)}px`);
    btn.style('font-weight', 'bold');
    btn.style('cursor', 'pointer');
    btn.style('box-shadow', '0 4px 6px rgba(0,0,0,0.3)');

    btn.elt.addEventListener('click', () => {
      playClickSound();
      window.open(b.url, "_self");
    });

    buttons.push({ dom: btn });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buildDOMLayout();
}

function draw() {
  background(20);

  let s = min(windowWidth / 1200, windowHeight / 800);
  s = max(s, 0.45);

  let titleSize = max(52 * s, 26);
  let titleY = max(91 * s, 40);

  fill(255);
  textAlign(CENTER, TOP);
  textSize(titleSize);
  textStyle(BOLD);
  text("Trajectory Tester: The Flight of Physics", windowWidth / 2, titleY);

  textSize(max(24 * s, 14));
  textStyle(NORMAL);
  fill(200);
  let subtitleY = titleY + titleSize + 10;
  text(
    "Explore how angle, speed, and gravity shape the path of objects.",
    windowWidth / 2,
    subtitleY
  );
}

function playClickSound() {
  if (clickSound && clickSound.isPlaying && clickSound.isPlaying()) {
    clickSound.stop();
  }
  clickSound.play();
}

