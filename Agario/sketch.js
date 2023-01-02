const socket = io('https://account.lachlangmurphy.com');
let user;
if (localStorage.getItem('user') != null) {
    socket.emit('getUserData', localStorage.getItem('user'));
}

socket.on('userData', data => {
    user = data;
    document.getElementById('account').innerHTML = user.firstName;
});

socket.on('failedSetHigh', () => {
    console.log("Could not set high score.");
});

socket.on('sendKey', key => {
	let param = new URLSearchParams();
	param.append('user', key);
	let url = "https://account.lachlangmurphy.com/account/?" + param.toString();
	window.location.href = url;
});

function account() {
	if (user != null)
		socket.emit('requestKey', user.email);
	else
		window.location.href = "https://account.lachlangmurphy.com/signin/";
}

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
  text(floor(player.r),width/2,50);
  
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
      if (i != j &&
          p5.Vector.sub(enemies[j].pos,enemies[i].pos).mag() < enemies[i].r &&
          enemies[j].r-enemies[i].r * 0.1 < enemies[i].r) {
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
  if (game) {
    player.display();
    player.edges(arena);
    player.friction();
    player.collect(food);
    player.eat(enemies);

    let mouse = createVector(mouseX,mouseY);
    let dir = p5.Vector.sub(mouse,createVector(width/2,height/2));
    player.vel.add(dir.setMag(0.5)); // Player max speed
  } else {
    // What happens locally if the game ends
    fill(255,0,0);
    textSize(50);
    let highScore = "Sign In!";
    let score = floor(player.r);
    if (localStorage.getItem('user') != null) {
      highScore = user.agarioHigh;
    }
    if (user != null && score > user.agarioHigh) {
      highScore = score;
      user.agarioHigh = score;
      socket.emit('setHigh', [user.email,'agarioHigh',score]);
    }
    let w = player.pos.x;
    let h = player.pos.y;
    text("You Died", width/2+w,height/5+h);
    text("Score: "+score, width/2+w,2*height/5+h);
    text("High Score: "+highScore, width/2+w,3*height/5+h);
    text("Space to Play Again", width/2+w, 4*height/5+h);
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
      game = true;
    }
  }
}

function keyPressed() {
  // Add to gameMenu inputs
  if (screenId === 1 && playerName.selected) {
    playerName.addContent(key,keyCode);
  }

  // Restart game
  if (keyCode === 32 && !game) {
    screenId = 1;
  }
}