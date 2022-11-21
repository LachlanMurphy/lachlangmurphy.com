class Particle {
  constructor(x,y,r) {
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.r = r;
    this.col = color(random(255),random(255),random(255));
    this.id = "Player " + floor(random(0,1000));
  }
  
  display() {
    this.vel.limit(2000/this.r+3); // Balence size to speed
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    // Slowly reduce size
    if (this.r > 100) {
      this.r -= 0.05;
    }
    
    fill(this.col);
    stroke(255);
    circle(this.pos.x,this.pos.y,this.r*2);
    fill(255);
    stroke(0);
    strokeWeight(4);
    textSize(this.r/4);
    text(this.id,this.pos.x,this.pos.y);
  }
  
  edges(a) {
    // Collisions with walls
    if (this.pos.x+this.r > a.w) {
      this.pos.x = a.w-this.r;
      this.vel.x *= -1;
    }
    if (this.pos.x-this.r < 0) {
      this.pos.x = 0+this.r;
      this.vel.x *= -1;
    }
    if (this.pos.y+this.r > a.h) {
      this.pos.y = a.h-this.r;
      this.vel.y *= -1;
    }
    if (this.pos.y-this.r < 0) {
      this.pos.y = 0+this.r;
      this.vel.y *= -1;
    }
  }
  
  collect(food) {
    // eat food
    for (let f of food) {
      if (dist(f.pos.x,f.pos.y,this.pos.x,this.pos.y) < f.r+this.r) {
        f.pos.set(random(0,arena.w),random(0,arena.h));
        this.r++;
      }
    }
  }
  
  eat(enemies) {}
  
  friction() {
    // Applies friction to the object
    let friction = this.vel.copy().setMag(this.vel.mag()*.1).mult(-1);
    this.vel.add(friction);
  }
}