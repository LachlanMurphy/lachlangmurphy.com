ArrayList<Blast> blast = new ArrayList<Blast>();
ArrayList<Firework> firework = new ArrayList<Firework>();

void setup() {
  size(1000,500);
  surface.setResizable(true);
  background(0);
}

void draw() {
  fill(0,20);
  rect(0,0,width,height);
  
  if (random(0,100) < 10) {
    firework.add(new Firework());
  }
  
  for (Firework f: firework) {
    f.show();
  }
  
  for (int i = firework.size()-1; i >= 0; i--) {
    if (firework.get(i).lifeTime <= 0) {
      blast.add(new Blast(firework.get(i).pos.x,firework.get(i).pos.y,20));
      firework.remove(firework.get(i));
    }
  }
  
  for (Blast b: blast) {
    b.show();
  }
  
  for (int i = blast.size()-1; i >= 0; i--) {
    if (blast.get(i).particle.get(0).lifeTime <= 0) {
      blast.remove(blast.get(i));
    }
  }
}

void mousePressed() {
  blast.add(new Blast(mouseX, mouseY,20));
}
