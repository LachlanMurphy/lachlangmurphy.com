Arena arena;
Particle player;
ArrayList<Particle> enemies = new ArrayList<>();

float zoom = 1;

int screenId = 1;

ArrayList<Particle> food = new ArrayList<>();
ArrayList<String> keys = new ArrayList<>();

boolean game = true;

Input playerName;
Input playButton;

void setup() {
  size(1000,700);
  
  textAlign(CENTER,CENTER);
  
  arena = new Arena(5000,5000);
  
  playerName = new Input(width/2,height/2-100, 400, 100);
  playButton = new Input(width/2, height/2+100, 400,100);
  playButton.content = "Play!";
  
  for (int i = 0; i < 10; i++) {
    enemies.add(new Enemy(random(40,arena.w-40),random(40,arena.h-40), random(50,75)));
  }
  
  for (int i = 0; i < 500; i++) {
    food.add(new Food(random(0,arena.w),random(0,arena.h),5));
  }
}

void draw() {
  if (screenId == 1) {
    drawMenu();
  } if (screenId == 2) {
    drawGame();
  }
}

void drawMenu() {
  background(255);
  arena.display();
  
  playerName.display();
  playButton.display();
}

void drawGame() {
  background(255);
  
  // Player score
  fill(0);
  textSize(90);
  text((int)player.r,width/2,20);
  
  // The offset is the player's position reversed
  PVector offSet = player.pos.copy().mult(-1);
  
  // Move to center
  translate(width/2,height/2);
  // Make smooth transitions for camera when eating food
  if (player.r > 100) {
    float newZoom = 100 / player.r;
    zoom = lerp(zoom,newZoom, 0.1);
  }
  // Very screen based on size
  scale(zoom);
  translate(offSet.x,offSet.y); // Set everything relative to top left of the arena
  
  arena.display();
  
  for (Particle f: food) {
    f.display();
  }
  
  for (int i = enemies.size()-1; i >= 0; i--) {
    enemies.get(i).display();
    enemies.get(i).edges(arena);
    enemies.get(i).collect(food);
    enemies.get(i).friction();
    
    for (int j = enemies.size()-1; j >= 0; j--) {
      if (j != i &&
          PVector.sub(enemies.get(j).pos,enemies.get(i).pos).mag() < enemies.get(i).r &&
          enemies.get(j).r-enemies.get(i).r*0.1 < enemies.get(i).r) {
        enemies.get(i).r += enemies.get(j).r * 0.1;
        enemies.remove(enemies.get(j));
        enemies.add(new Enemy(random(40,arena.w-40),random(40,arena.h-40), random(50,75)));
      }
    }
    
    if (dist(enemies.get(i).pos.x,enemies.get(i).pos.y,player.pos.x,player.pos.y) < enemies.get(i).r &&
        player.r/enemies.get(i).r < 0.9) {
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
  if (keys.contains("83"))
    player.vel.y += 1;
  if (keys.contains("87"))
    player.vel.y -= 1;
  if (keys.contains("68"))
    player.vel.x += 1;
  if (keys.contains("65"))
    player.vel.x -= 1;
    
  if (!game) {
    background(255,0,0);
    noLoop();
  }
}

void mousePressed() {
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

void keyPressed() {
  if (!keys.contains(Integer.toString(keyCode)))
    keys.add(Integer.toString(keyCode));
  
  if (screenId == 1) {
    playerName.addContent(key, keyCode);
  }
}

void keyReleased() {
  keys.remove(Integer.toString(keyCode));
}
