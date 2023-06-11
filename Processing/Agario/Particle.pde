abstract class Particle {
  PVector pos;
  PVector vel;
  PVector acc;
  
  float r;
  
  color col = color(random(255),random(255),random(255));
  
  String id;
  
  Particle(float x, float y, float r) {
    pos = new PVector(x,y);
    vel = new PVector(0,0);
    acc = new PVector(0,0);
    this.r = r;
    id = "Player " + (int)random(0,1000);
  }
  
  void display() {
    vel.limit(2000/r+3); // Balence size to speed
    vel.add(acc);
    pos.add(vel);
    
    // Slowly reduce size
    if (this.r > 100) {
      this.r -= 0.05;
    }
    
    fill(col);
    stroke(255);
    circle(pos.x,pos.y,r*2);
    fill(255);
    stroke(0);
    strokeWeight(4);
    textSize(r/4);
    text(id,pos.x,pos.y);
  }
  
  void edges(Arena a) {
    // Collisions with walls
    if (pos.x+r > a.w) {
      pos.x = a.w-r;
      vel.x *= -1;
    }
    if (pos.x-r < 0) {
      pos.x = 0+r;
      vel.x *= -1;
    }
    if (pos.y+r > a.h) {
      pos.y = a.h-r;
      vel.y *= -1;
    }
    if (pos.y-r < 0) {
      pos.y = 0+r;
      vel.y *= -1;
    }
  }
  
  void collect(ArrayList<Particle> food) {
    // eat food
    for (Particle f: food) {
      if (dist(f.pos.x,f.pos.y,pos.x,pos.y) < f.r+r) {
        f.pos.set(random(0,arena.w),random(0,arena.h));
        r++;
      }
    }
  }
  
  void eat(ArrayList<Particle> enemies) {}
  
  void friction() {
    // Applies friction to the object
    PVector friction = vel.copy().setMag(vel.mag()*.1).mult(-1);
    vel.add(friction);
  }
}
