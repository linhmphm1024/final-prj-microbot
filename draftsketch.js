let handpose;
let video;
let hands = [];

let spaceX = 5;
let spaceY = 5;

let handX;
let handY;

let handArr = [];
let subArr;

let diam = 5;

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
      handArr = []
      for (i in hands[0].landmarks) {
        subArr = hands[0].landmarks[i];
        handArr.push(subArr);
        // console.log(subArr);
      }
      // console.log(handArr);
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
  // console.log("this func works")
  // background(0,0,0,20);

  for (let x = 10; x < width; x += spaceX) {
    for (let y = 10; y < height; y += spaceY) {
      
      // // noFill();
      // beginShape();
      // for (i in handArr) {
      //   vertex(handArr[i][0], handArr[i][1]);
      //   let d = 
      // }
      // endShape(CLOSE);
      // // draw the circle as simple
      // for (i in handArr) {
      //   if (handArr != []) {
      //     fill(0,255,0);
      //     ellipse(handArr[i][0], handArr[i][1], diam, diam);
      //   }
      // }

      for (i in handArr) {
        let d = dist(handArr[i][0], handArr[i][1], x, y);
        if (d < 70) {
          diam = map(d, 0, 70, 20, 1);
          opac = map(d, 0, 70, 20, 0);
          fill(255, 0, 0, opac);
          ellipse(x, y, diam, diam);

        } else {
          // fill(255, 255, 255, 10);
          // diam = 5;
          // ellipse(x, y, diam, diam);
        }
      };
      // fill (255,255, 255, 20);
      // ellipse(x, y, diam, diam);


      

    }
  }
  
};

