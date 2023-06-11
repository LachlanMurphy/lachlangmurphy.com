class Arrow {
  PVector pos;
  PVector vel;
  PVector gravity;
  Bow parent;
  
  int count;
  
  Arrow(float x, float y, Bow parent) {
    this.parent = parent;
    pos = new PVector(x,y);
    vel = parent.bow.copy().sub(parent.pos).limit(10);
    gravity = new PVector(0,0.1);
    count = 0;
  }
  
  void display() {
    stroke(0);
    
    vel.add(gravity);
    pos.add(vel);
    
    PVector tail = PVector.sub(pos,vel.copy().setMag(50));
    line(pos.x,pos.y,tail.x,tail.y);
    
    count++;
  }
}
