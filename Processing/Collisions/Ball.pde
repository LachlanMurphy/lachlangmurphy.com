class Ball {
  PVector pos;
  PVector vel;
  PVector acc;
  
  float r;
  color col;
  
  Ball(float x, float y, float rad) {
    pos = new PVector(x,y);
    vel = new PVector(0,0);
    acc = new PVector(0,0);
    r = rad;
    col = color(random(255),random(255),random(255));
  }
  
  void display() {
    vel.add(acc);
    vel.mult(0.9);
    pos.add(vel);
    
    for (Wall w: walls)
      w.hit(ball);
    
    fill(col);
    circle(pos.x,pos.y,r*2);
  }
}
