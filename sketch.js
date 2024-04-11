let handpose;
let video;
let hands = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("hand", results => {
    hands = results;
    console.log(results);
    // console.log(hands[0].landmarks[8]);
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
  video.hide();

//   We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {


    for (let i = 0; i < hands.length; i += 1) {
        const hand = hands[i];

        const keypoint = hand.landmarks[9];
        fill(keypoint[1], keypoint[0], 0);
        ellipse(keypoint[0], keypoint[1],100, 100);
        // console.log(keypoint[2]);


        // for (let j = 0; j < hand.landmarks.length; j += 1) {
        //     const keypoint = hand.landmarks[j];
        //     fill(0, 255, 0);
        //     noStroke();
        //     ellipse(keypoint[0], keypoint[1],20, 20);
        //     console.log(keypoint[2]);
        // }
    }
}
