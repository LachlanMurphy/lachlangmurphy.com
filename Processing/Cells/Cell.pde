class Cell {
  PVector pos;
  PVector vel;
  
  ArrayList<DNA> dna = new ArrayList<DNA>();
  
  float r;
  float heading;
  
  Cell(float x, float y, float r) {
    pos = new PVector(x,y);
    this.r = r;
    heading = 0;
    
    vel = new PVector(1,0);
    
    for (int i = 0; i < 5; i++)
      dna.add(new DNA(this, 5));
  }
  
  void display() {
    fill(230,230,250);
    circle(pos.x,pos.y,r*2);
    
    r += 0.01;
    
    // Wall collisions
    if (pos.x+r > width) {
      pos.x = width-r;
      vel.x *= -1;
    }
    if (pos.x-r < 0) {
      pos.x = 0+r;
      vel.x *= -1;
    }
    if (pos.y+r > height) {
      pos.y = height-r;
      vel.y *= -1;
    }
    if (pos.y-r < 0) {
      pos.y = 0+r;
      vel.y *= -1;
    }
    PVector forward = pos.copy().add(vel.copy().setMag(1000));
    
    if (random(1) < .5)
      heading += PI/30;
    else 
      heading += -PI/30;
    
    PVector dot = forward.copy();
    dot.x += 25*cos(heading+vel.heading());
    dot.y += 25*sin(heading+vel.heading());
    
    PVector newVel = PVector.sub(dot,pos).limit(1);
    
    vel = newVel.copy();
    
    pos.add(vel);
    
    for (DNA d: dna) {
      d.display();
    }
  }
  
  void hit(Cell c) {
    if (dist(pos.x,pos.y,c.pos.x,c.pos.y) < r+c.r) {
      PVector temp = c.vel.copy();
      c.vel = vel.copy();
      vel = temp.copy();
      r -= 0.02;
    }
  }
}
