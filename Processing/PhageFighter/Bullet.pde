class Bullet {
  PVector pos = new PVector(0,0);
  PVector vel = new PVector(0,0);
  boolean clear;
  
  Bullet(Player player) {
    pos.x = player.gun.x;
    pos.y = player.gun.y;
    vel.x = player.gun.x - player.pos.x-10;
    vel.y = player.gun.y - player.pos.y-10;
    vel.setMag(10);
    
    clear = false;
  }
  
  void step() {
    pos.add(vel);
  }
  
  void display() {
    fill(0);
    ellipse(pos.x,pos.y,10,10);
  }
}
