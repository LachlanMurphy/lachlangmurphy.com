class Burst {
  PVector pos;
  float lifetime;
  Particle[] particles;
  int count;
  
  Burst(float x, float y) {
    pos = new PVector(x,y);
    
    particles = new Particle[(int)random(10,21)];
    for (int i = 0; i < particles.length; i++) {
      particles[i] = new Particle(pos.x,pos.y,this);
    }
    
    count = 0;
  }
  
  void display() {
    count++;
    for (Particle p: particles)
      p.display();
  }
}
