class Particle {
  PVector pos;
  PVector vel;
  PVector gravity;
  color col;
  Burst parent;
  
  Particle(float x, float y, Burst parent) {
    pos = new PVector(x,y);
    vel = PVector.random2D().setMag(random(5,10));
    gravity = new PVector(0,0.1);
    col = color(random(255),random(255),random(255));
    this.parent = parent;
  }
  
  void display() {
    fill(col);
    if (parent.count > 50)
      fill(col,100-parent.count);
    noStroke();
    ellipse(pos.x,pos.y,5,5);
    vel.add(gravity);
    vel.mult(0.95);
    pos.add(vel);
  }
}
