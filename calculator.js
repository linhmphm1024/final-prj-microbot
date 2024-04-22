let spaceX = 20, spaceY = 20; diam = 10;

function setup() {
    createCanvas(400, 400);
    noStroke();
}

function draw() {
    background(220);

    for (let x = 10; x < innerWidth; x += spaceX) {
      for (let y = 10; y < innerHeight; y += spaceY) {
        let d = dist(mouseX, mouseY, x, y);
        if (d < 100) {
          fill(255, 0, 0);
          diam = map (d, 0, 100, 50, 1);
        } else {
          fill(255);
          diam = 10;
        };
        ellipse(x, y, diam, diam);

      }
    }
  }