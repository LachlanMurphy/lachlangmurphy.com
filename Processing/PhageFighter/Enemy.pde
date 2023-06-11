class Enemy {
  PVector pos = new PVector(0,0);
  PVector vel = new PVector(0,0);
  int edge;
  int health;
  Player player;
  
  PImage img;
  
  Enemy(Player player_) {
    health = 100;
    img = loadImage("enemy.jpg");
    
    player = player_;
    
    edge = (int)random(1,5);
    if (edge == 1) {
      pos.x = random(0,width);
      pos.y = -50;
    } else if (edge == 2) {
      pos.x = width+50;
      pos.y = random(0,height);
    } else if (edge == 3) {
      pos.x = random(0,width);
      pos.y = height+50;
    } else if (edge == 4) {
      pos.x = -50;
      pos.y = random(0,height);
    }
  }
  
  void step() {
    vel.x = player.pos.x-pos.x;
    vel.y = player.pos.y-pos.y;
    vel.setMag(1);
    pos.add(vel);
  }
  
  void display() {
    // Display enemy
    image(img,pos.x,pos.y);
    
    // Display health bar
    if (health < 100) {
      stroke(0);
      rect(pos.x-15,pos.y-15,map(health,0,100,0,30),5);
    }
  }
}
