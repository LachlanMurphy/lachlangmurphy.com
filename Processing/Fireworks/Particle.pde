class Particle {
  PVector pos = new PVector(0,0);
  PVector vel = PVector.random2D().mult(random(5,20));
  PVector acc = new PVector(0,0.1);
  
  int lifeTime;
  
  color col;
  
  Particle(float x, float y, color col) {
    pos.x = x;
    pos.y = y;
    
    this.col = col;
    
    lifeTime = 255;
  }
  
  void step() {
    PVector drag = vel.copy();
    drag.mult(-0.1);
    vel.add(drag);
    vel.add(acc);
    pos.add(vel);
    lifeTime -= 2;
  }
  
  void display() {
    noStroke();
    fill(col,lifeTime);
    ellipse(pos.x,pos.y,10,10);
  }
}
