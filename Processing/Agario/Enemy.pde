class Enemy extends Particle {
  Enemy(float x, float y, float r) {
    super(x,y,r);
    // Random initial velocity
    vel = PVector.random2D().setMag(random(10,0));
  }
  
  void attract() {
    float closest = Float.POSITIVE_INFINITY;
    PVector attractor = new PVector(Float.POSITIVE_INFINITY,Float.POSITIVE_INFINITY);
    
    for (Particle f: food) {
      float dist = dist(f.pos.x,f.pos.y,pos.x,pos.y);
      if (dist < closest) {
        closest = dist;
        attractor = f.pos.copy();
      }
    }
    
    for (Particle e: enemies) {
      if (e != this && PVector.sub(e.pos,pos).mag() < e.r+r+1000 && e.r/r < 0.9) {
        attractor = e.pos.copy();
      }
    }
    
    if (PVector.sub(player.pos,pos).mag() < player.r+r+1000 && player.r/r < 0.9) {
      attractor = player.pos.copy();
    }
    
    PVector desiredVel = PVector.sub(attractor,pos);
    desiredVel.limit(1);
    vel.add(desiredVel);
  }
  
  void evade() {
    Particle evader = new Enemy(Float.POSITIVE_INFINITY,Float.POSITIVE_INFINITY,1);
    
    for (Particle e: enemies) {
      if (PVector.sub(e.pos,pos).mag() < e.r+r+1000 && e.r/r > 1.1) {
        evader = e;
      }
    }
    
    if (PVector.sub(player.pos,pos).mag() < player.r+r+1000 && PVector.sub(evader.pos,pos).mag() > PVector.sub(player.pos,pos).mag() && player.r/r > 1.1) {
      evader = player;
    }
    
    PVector desiredVel = PVector.sub(evader.pos,pos).mult(-1);
    if (desiredVel.mag() < r+evader.r+500) {
      desiredVel.limit(1);
      vel.add(desiredVel);
    }
  }
  
  void display() {
    evade();
    attract();
    
    super.display();
  }
}
