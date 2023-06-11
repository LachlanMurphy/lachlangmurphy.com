class DNA {
  PVector pos;
  PVector vel;
  
  Cell parent;
  
  float r;
  
  DNA(Cell parent, float r) {
    pos = new PVector(parent.pos.x,parent.pos.y);
    vel = new PVector(random(-2,2),random(-2,2));
    
    this.parent = parent;
    
    this.r = r;
  }
  
  void display() {
    if (dist(parent.pos.x,parent.pos.y,pos.x,pos.y) > parent.r-r) {
      vel = PVector.sub(parent.pos,pos).limit(parent.vel.mag()*1.5);
    }
    
    pos.add(vel);
    
    fill(255);
    circle(pos.x,pos.y,r*2);
  }
}
