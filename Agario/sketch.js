let arena;
let player;

let enemies = [];
let food = [];
let keys = [];

let zoom;

let screenId;

let game;

let playerName;
let playButton;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  textAlign(CENTER,CENTER);
  
  arena = new Arena(5000,5000);
  
  playerName = new Input(width/2,height/2-100,400,100);
  playButton = new Input(width/2,height/2+100,400,100);
  playButton.content = "Play!";
  
  zoom = 1;
  screenId = 1;
  game = true;
  
  for (let i = 0; i < 500; i++) {
    food.push(new Food(random(0,arena.w),random(0,arena.h),5));
  }
  
  for (let i = 0; i < 10; i++) {
    enemies.push(new Enemy(random(40,arena.w-40),random(40,arena.h-40),random(20,75)));
  }
}

function draw() {
  if (screenId == 1) {
    drawMenu();
  } if (screenId == 2) {
    drawGame();
  }
}

function drawMenu() {
  background(255);
  arena.display();
  
  playerName.display();
  playButton.display();
}

function drawGame() {
  background(255);
  
  // Player score
  fill(0);
  textSize(90);
  text(floor(player.r),width/2,20);
  
  // The offset is the player's position reversed
  let offSet = player.pos.copy().mult(-1);
  
  // Move to center
  translate(width/2,height/2);
  // Make smooth transitions for camera when eating food
  if (player.r > 100) {
    let newZoom = 100 / player.r;
    zoom = lerp(zoom,newZoom, 0.1);
  }
  // Very screen based on size
  scale(zoom);
  translate(offSet.x,offSet.y); // Set everything relative to top left of the arena
  
  arena.display();
  
  for (let i = food.length-1; i >= 0; i--) {
    food[i].display();
  }
  
  for (let i = enemies.length-1; i >= 0; i--) {
    enemies[i].display();
    enemies[i].edges(arena);
    enemies[i].collect(food);
    enemies[i].friction();
    
    for (let j = enemies.length-1; j >= 0; j--) {
      // try {
        if (i != j &&
            p5.Vector.sub(enemies[j].pos,enemies[i].pos).mag() < enemies[i].r &&
            enemies[j].r-enemies[i].r * 0.1 < enemies[i].r) {
          console.log("L");
          enemies[i].r += enemies[j].r * 0.1;
          enemies.splice(j,1);
          enemies.push(new Enemy(random(40,arena.w-40),random(40,arena.h-40), random(50,75)));
        }
    }
    
    if (dist(enemies[i].pos.x,enemies[i].pos.y,player.pos.x,player.pos.y) < enemies[i].r &&
        player.r/enemies[i].r < 0.9) {
     game = false;
    }
  }
  
  // Player commands
  player.display();
  player.edges(arena);
  player.friction();
  player.collect(food);
  player.eat(enemies);
  
  // Controls the player
  if (keys.includes(83))
    player.vel.y += 1;
  if (keys.includes(87))
    player.vel.y -= 1;
  if (keys.includes(68))
    player.vel.x += 1;
  if (keys.includes(65))
    player.vel.x -= 1;
  
  if (!game) {
    background(255,0,0);
    noLoop();
  }
}

function mousePressed() {
  if (screenId == 1) {
    if (playerName.contains(mouseX,mouseY)) {
      playerName.selected = true;
    } else {
      playerName.selected = false;
    }
    
    if (playButton.contains(mouseX,mouseY)) {
      player = new Player(width/2,height/2,random(50,75), playerName.content);
      screenId = 2;
    }
  }
}

function keyPressed() {
  if (!keys.includes(keyCode))
    keys.push(keyCode);
  if (screenId == 1) {
    playerName.addContent(key, keyCode);
  }
}

function keyReleased() {
  let index = keys.indexOf(keyCode);
  keys.splice(index,1);
}