let handpose;
let video;
let hands = [];

let spaceX = 10;
let spaceY = 10;

let handX;
let handY;

let handXarr = [];
let handYarr = [];


let diam = 10;

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
      console.log(hands);
      for (i in hands[0].landmarks) {
        handXarr.push(hands[0].landmarks[i][0]);
        handYarr.push(hands[0].landmarks[i][1]);
      }


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
  drawCircles();

  //  DRAW THE MICROBOT   
//   drawCircle();


  

}


function drawCircle() {
  background(0,0,0,20);
  fill(255, 255, 255);

  for (let x = 10; x < width; x += spaceX) {
    for (let y = 10; y < height; y += spaceY) {
      for (i in handXarr) {
      
      }
      let d = dist(handX, handY, x, y);
      if (d < 150) {
        
        diam = map (d, 0, 150, 50, 1);
        opac = map(d, 20, 150, 100, 30);
        fill(255, 255, 255, opac);

      } else {
        fill(0);
        diam = 5;
      };
      ellipse(x, y, diam, diam);

    }
  }
};


function drawCircles() {
    
}