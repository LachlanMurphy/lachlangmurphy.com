

function setup() {
    createCanvas(700,500);
}

function draw() {
    drawSky();
    drawSun();
    drawOcean();
    noLoop();
}

function drawSky() {
    let r = 0;
    let g = 0;
    let b = 100;
    for (let i = 0; i < height/2; i++) {
        b -= 0.01;
        r += 2;
        g += 0.75;

        stroke(r,g,b);
        line(0,i,width,i);
    }
}

function drawSun() {
    noStroke();
    fill(255,165,0);
    circle(width/2,height/2, 250);
}

function drawOcean() {
    fill(0,25,150);
    rect(0,height/2,width,height/2);
}
