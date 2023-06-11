Bow bow;

void setup() {
  size(1000,700);
  surface.setResizable(true);
  background(255);
  
  bow = new Bow();
}

void draw() {
  fill(255,20);
  rect(0,0,width,height);
  
  if (bow.show)
    bow.display();
  
  for (Arrow a: bow.arrows) {
    a.display();
  }
  
  for (int i = 0; i < bow.arrows.size(); i++) {
    if (bow.arrows.get(i).count > 50) {
      bow.bursts.add(new Burst(bow.arrows.get(i).pos.x,bow.arrows.get(i).pos.y));
      bow.arrows.remove(bow.arrows.get(i));
    }
  }
  
  for (int i = 0; i < bow.bursts.size(); i++) {
    bow.bursts.get(i).display();
    if (bow.bursts.get(i).count > 100) {
      bow.bursts.remove(bow.bursts.get(i));
    }
  }
}

void mousePressed() {
  bow.show = true;
  bow.pos.set(mouseX,mouseY);
}

void mouseReleased() {
  bow.show = false;
  bow.shoot();
}
