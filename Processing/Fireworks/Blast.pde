class Blast {
  PVector pos = new PVector(0,0);
  
  ArrayList<Particle> particle = new ArrayList<Particle>();
  
  Blast(float x, float y, float amt) {
    pos.x = x;
    pos.y = y;
    
    color col = color(random(100,255),random(100,255),random(100,255));
    
    for (int i = 0; i < amt; i++) {
      particle.add(new Particle(pos.x,pos.y,col));
    }
  }
  
  void show() {
    for (Particle p: particle) {
      p.step();
      p.display();
    }
  }
}
