/*
 * Class to create the asteroids
 */
class Rock {
  float size;
  float m;
  PVector pos = new PVector(0,0);
  PVector vel = new PVector(0,0);
  int edge;
  boolean start;
  
  // Constructor if it is the first rock, aka not shot
  Rock(float size_) {
    size = size_;
    start = true;
    m = random(2,4);
    
    // Assign the rock a random edge of the screen to come from
    edge = (int)random(1,5);
    
    if (edge == 1) {
      pos.x = width/2;
      pos.y = -200;
      float a = random(-3*(float)Math.PI/4,3*(float)Math.PI/4); // Angle
      
      vel.x = m*cos(a);
      vel.y = -m*sin(a); // Opposite because it's not in cartesian plane
      
    } else if (edge == 2) {
      pos.x = width+200;
      pos.y = height/2;
      float a = random(3*(float)Math.PI/4,5*(float)Math.PI/4);
      
      vel.x = m*cos(a);
      vel.y = -m*sin(a);
      
    } else if (edge == 3) {
      pos.x = width/2;
      pos.y = height+200;
      float a = random(1*(float)Math.PI/4,3*(float)Math.PI/4);
      
      vel.x = m*cos(a);
      vel.y = -m*sin(a);
      
    } else if (edge == 4) {
      pos.x = -200;
      pos.y = height/2;
      float a = random(-1*(float)Math.PI/4,1*(float)Math.PI/4);
      
      vel.x = m*cos(a);
      vel.y = -m*sin(a);
      
    }
  }
  
  // Consructor if it has a parent rock, aka has been shot
  Rock(float size_, Rock parent) {
    size = size_;
    start = false;
    
    float m = parent.vel.mag();
    float a = parent.vel.heading();
    
    a = a + random(-1*(float)Math.PI/2,(float)Math.PI/2);
    
    vel.x = m * cos(a);
    vel.y = m * sin(a);
    
    // Can't do pos = parent.pos because of the way PVectors work
    pos.x = parent.pos.x;
    pos.y = parent.pos.y;
  }
  
  void step() {
    pos.add(vel);
  }
  
  void display() {
    // Checks if it's still inside its "spawn zone"
    if (edge == 1 && pos.y > 0) {
      start = false;
    } else if (edge == 2 && pos.x < width) {
      start = false;
    } else if (edge == 3 && pos.y < height) {
      start = false;
    } else if (edge == 4 && pos.x > 0) {
      start = false;
    }
    
    stroke(255);
    ellipse(pos.x, pos.y, size, size);
  }
}
