int screenID;

ArrayList<Button> menuB = new ArrayList<Button>();
ArrayList<Button> levelB = new ArrayList<Button>();
ArrayList<String> keys = new ArrayList<String>();
ArrayList<Bullet> bullet = new ArrayList<Bullet>();
ArrayList<Enemy> enemy = new ArrayList<Enemy>();
ArrayList<Gem> gem = new ArrayList<Gem>();

PImage imgBack;
PImage imgGame;

int gemLevel;
int gemCount;
int gemLCB;
int gemLCA;
int fireCap;
int[] choice = new int[3];

Player player;

void setup() {
  size(1000,700);
  frameRate(30);
  
  imgBack = loadImage("background.jpg");
  imgGame = loadImage("gameBackground.jpg");
  imgBack.resize(1000,700);
  imgGame.resize(1000,700);
  
  screenID = 0;
  gemCount = 0;
  gemLevel = 1;
  gemLCB = 0;
  gemLCA = 1;
  
  player = new Player();
  
  enemy.add(new Enemy(player));
  
  fireCap = 0;
}

void draw() {
  if (screenID == 0) {
    displayMenu();
  } else if (screenID == 1) {
    displayGame();
  } else if (screenID == 2) {
    levelUp();
  }
}

void displayGame() {
  background(imgGame);
  
  player.step();
  player.display();
  
  // Gem collection
  for (int i = gem.size()-1; i >= 0; i--) {
    if (gem.get(i).pos.x+player.collectRadius >= player.pos.x && gem.get(i).pos.x-player.collectRadius <= player.pos.x+20 &&
        gem.get(i).pos.y+player.collectRadius >= player.pos.y && gem.get(i).pos.y-player.collectRadius <= player.pos.y+20) {
      gemCount++;
      gem.remove(gem.get(i));
    }
  }
  
  for (int i = bullet.size()-1; i >=0; i--) {
    if (bullet.get(i).pos.x-5 >= width || bullet.get(i).pos.x+5 <= 0 || bullet.get(i).pos.y-5 >= height || bullet.get(i).pos.y+5 <= 0) {
      bullet.remove(bullet.get(i));
    } else {
      bullet.get(i).step();
      bullet.get(i).display();
    }
  }
  
  // Add enemies
  if (random(0,100) < 101) {
    enemy.add(new Enemy(player));
  }
  
  for (Enemy e: enemy) {
    e.step();
    e.display();
  }
  
  for (int i = bullet.size()-1; i >= 0; i--) {
    for (int j = enemy.size()-1; j >= 0; j--) {
      if (bullet.get(i).pos.x+5 >= enemy.get(j).pos.x && bullet.get(i).pos.x-5 <= enemy.get(j).pos.x+20 && 
      bullet.get(i).pos.y+5 >= enemy.get(j).pos.y && bullet.get(i).pos.y-5 <= enemy.get(j).pos.y+20) {
        bullet.get(i).clear = true;
        enemy.get(j).health -= 100;
      }
    }
    
    if (bullet.get(i).clear) {
      bullet.remove(bullet.get(i));
    }
  }
  
  // See if enemy hits player
  for (int i = enemy.size()-1; i >= 0; i--) {
    if (enemy.get(i).pos.x+20 >= player.pos.x
     && enemy.get(i).pos.x <= player.pos.x+20
     && enemy.get(i).pos.y+20 >= player.pos.y
     && enemy.get(i).pos.y <= player.pos.y+20) {
      player.health--;
    }
  }
  
  // If enemy hits sheild
  for (int i = enemy.size()-1; i >= 0; i--) {
    if (dist(enemy.get(i).pos.x+10,enemy.get(i).pos.y+10,player.pos.x+10,player.pos.y+10) <= player.sheild*25) {
      enemy.get(i).health -= 5;
    }
  }
  
  for (Gem g: gem) {
    g.display();
  }
  
  if (keys.contains("87")) {
    player.acc.y = -1;
  }
  if (keys.contains("83")) {
    player.acc.y = 1;
  }
  if (keys.contains("68")) {
    player.acc.x = 1;
  }
  if (keys.contains("65")) {
    player.acc.x = -1;
  }
    
  if (player.vel.mag() > 0 && !(keys.contains("65") || keys.contains("68") || keys.contains("83") || keys.contains("87"))) {
    float m = player.vel.mag();
    
    player.vel.setMag(m-0.5);
  }
  
  if (player.vel.mag() < 0.2) {
    player.vel.setMag(0);
  }
  
  fill(255);
  rect(20,20,width-40,40);
  fill(0,255,0);
  rect(25,25,map(gemCount,gemLCB, gemLCA, 45, width-50),30);
  
  if (gemCount >= gemLCA && gemCount != 0) {
    choice[0] = (int)random(0,6);
    choice[1] = (int)random(0,6);
    while (choice[1] == choice[0]) {
      choice[1] = (int)random(0,6);
    }
    
    choice[2] = (int)random(0,6);
    while (choice[2] == choice[0] || choice[2] == choice[1]) {
      choice[2] = (int)random(0,6);
    }
    
    int[] h = new int[3];
    h[0] = 200;
    h[1] = 50;
    h[2] = -100;
    for (int i = 0; i <= 2; i++) {
      if (choice[i] == 0) {
        levelB.add(new Button(width/2-150,height/2-h[levelB.size()],"Speed++",300,100));
      }
      if (choice[i] == 1) {
        levelB.add(new Button(width/2-150,height/2-h[levelB.size()],"Collect Radius++",300,100));
      }
      if (choice[i] == 2) {
        levelB.add(new Button(width/2-150,height/2-h[levelB.size()],"Fire Rate++",300,100));
      }
      if (choice[i] == 3) {
        levelB.add(new Button(width/2-150,height/2-h[levelB.size()],"Sheild++",300,100));
      }
      if (choice[i] == 4) {
        levelB.add(new Button(width/2-150,height/2-h[levelB.size()],"Max Health++",300,100));
      }
      if (choice[i] == 5) {
        levelB.add(new Button(width/2-150,height/2-h[levelB.size()],"Health++",300,100));
      }
    }
    gemLCB = gemLCA;
    gemLCA += gemLCA*1.01;
    screenID = 2;
  }
  
  for (int i = enemy.size()-1; i >= 0; i--) {
    if (enemy.get(i).health <= 0) {
      gem.add(new Gem(enemy.get(i)));
      enemy.remove(enemy.get(i));
    }
  }
  
  if (fireCap > 0 && fireCap < player.fireRate) {
    fireCap++;
  } else {
    fireCap = 0;
  }
  
  player.vel.add(player.acc);
}

void levelUp() {
  
  for (Button b: levelB) {
    if (b.contains(mouseX,mouseY) && mousePressed) {
      b.displayI();
    } else {
      b.display();
    }
  }
  
}

void displayMenu() {
  image(imgBack,0,0);
  
  menuB.add(new Button(width-187,37, "Play!", 150,75));
  
  for (Button b: menuB) {
    if (b.contains(mouseX,mouseY) && mousePressed) {
      b.displayI();
    } else {
      b.display();
    }
  }
}

void mouseReleased() {
  if (menuB.get(0).contains(mouseX,mouseY) && screenID == 0) {
    screenID = 1;
  }
  
  if (screenID == 2) {
    if (screenID == 2 && levelB.get(0).contains(mouseX,mouseY)) {
      player.addAbility(choice[0]);
      screenID = 1;
      levelB.clear();
    }
    if (screenID == 2 && levelB.get(1).contains(mouseX,mouseY)) {
      player.addAbility(choice[1]);
      screenID = 1;
      levelB.clear();
    }
    if (screenID == 2 && levelB.get(2).contains(mouseX,mouseY)) {
      player.addAbility(choice[2]);
      screenID = 1;
      levelB.clear();
    }
  }
}

void keyPressed() {
  if (!keys.contains(Integer.toString(keyCode))) {
    keys.add(Integer.toString(keyCode));
  }
}

void keyReleased() {
  keys.remove(Integer.toString(keyCode));
}

void mousePressed() {
  if (screenID == 1 && fireCap == 0) {
    bullet.add(new Bullet(player));
    fireCap++;
  }
}
