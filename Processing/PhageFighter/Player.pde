class Player {
  PVector pos = new PVector(0,0);
  PVector vel = new PVector(0,0);
  PVector acc = new PVector(0,0);
  PVector gun = new PVector(0,0);
  
  int speed; // Type 0
  int collectRadius; // Type 1
  int fireRate; // Type 2
  int sheild; // Type 3
  int healthMax; // Type 4
  int health; // Type 5
  
  PImage img;
  
  Player() {
    pos.x = width/2-10;
    pos.y = height/2-10;
    
    img = loadImage("player.jpg");
    
    speed = 10; // Add as levels increase
    collectRadius = 10; // Add as levels increase
    fireRate = 0; // subtract as levels increase
    sheild = 0; // TODO
    health = 100; // TODO
    healthMax = 100; // TODO
  }
  
  void display() {
    // Display sheild
    fill(100,255,100,50);
    ellipse(pos.x+10,pos.y+10,sheild*50,sheild*50);
    
    // Display gun
    gun.x = mouseX - pos.x-10;
    gun.y = mouseY - pos.y-10;
    gun.setMag(20);
    gun.x += pos.x+10;
    gun.y += pos.y+10;
    
    stroke(255);
    strokeWeight(4);
    line(pos.x+10,pos.y+10,gun.x,gun.y);
    strokeWeight(0);
    
    // Display player
    image(img, pos.x,pos.y);
    
    // Display health bar
    fill(0);
    rect(pos.x-5,pos.y-10,map(health,0,healthMax,0,30),5);
  }
  
  void step() {
    acc = new PVector(0,0);
    vel.limit(speed);
    pos.add(vel);
    
    if (pos.x > width-20) {
      pos.x = width-20;
      vel.x *= -1;
    }
    if (pos.x < 0) {
      pos.x = 0;
      vel.x *= -1;
    }
    
    if (pos.y > height-20) {
      pos.y = height-20;
      vel.y *= -1;
    }
    if (pos.y < 0) {
      pos.y = 0;
      vel.y *= -1;
    }
  }
  
  void addAbility(int type) {
    if (type == 0) {
      speed++;
    }
    if (type == 1) {
      collectRadius += 20;
    }
    if (type == 2) {
      if (fireRate > 0) {
        fireRate--;
      }
    }
    if (type == 3) {
      sheild++;
    }
    if (type == 4) {
      int temp = healthMax;
      healthMax *= 1.5;
      health += healthMax - temp;
    }
    if (type == 5) {
      health += healthMax*0.2;
      if (health > healthMax) {
        health = healthMax;
      }
    }
  }
}
