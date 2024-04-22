let handpose;
let video;
let hands = [];

let spaceX = 10;
let spaceY = 10;

let handX;
let handY;

let r,g,b;

let diam = 10;

let handXmax = 0;
let handYmax = 0;

let handXmin = 0;
let handYmin = 0;

function setup() {
  createCanvas(640*1.5, 480*1.5);
  noStroke();
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("hand", results => {
    hands = results;
    // console.log(results);
    if (hands.length > 0) {
      handX = hands[0].landmarks[9][0];
      handY = hands[0].landmarks[9][1];
      checkMinMax(handX, handY);
      // console.log(hands[0].landmarks[9]);
      // drawCircle();
    } else {
      // handX = 0;
      // handY = 0;
      console.log("No hands detected")
    }
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  video.hide();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  scale(1.5,1.5)
  // video.hide();
  

  //  DRAW THE MICROBOT   
  drawCircle();


  

}


function drawCircle() {
  background(0,0,0,20);

  for (let x = 10; x < width; x += spaceX) {
    for (let y = 10; y < height; y += spaceY) {
      let d = dist(handX, handY, x, y);
      if (d < 150) {
        r = map(handX, 0, 150, 117, 0)
        g = map (handX, 0, 150, 255, 127)
        b = map (handY, 0, 150, 255, 255)
        diam = map (d, 0, 150, 50, 1);
        opac = map(d, 20, 150, 100, 30);
        fill(r, g, b, opac);

      } else {
        fill(255, 255, 255, 50);
        diam = 5;
      };
      ellipse(x, y, diam, diam);

    }
  }
};

function checkMinMax(handX, handY) {
  
  if (handXmin == 0) {
    handXmin = handX;
  }
  if (handYmin == 0) {
    handYmin = handY;
  }

  if (handXmin > handX) {
    handXmin = handX;
  }
  if (handYmin > handY) {
    handYmin = handY;
  }

  if (handX > handXmax) {
    handXmax = handX;
  }
  if (handY > handYmax) {
    handYmax = handY;
  }
  console.log(handXmin, handYmin,";", handXmax, handYmax);
  
}


