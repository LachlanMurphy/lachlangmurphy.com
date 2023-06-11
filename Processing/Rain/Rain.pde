ArrayList<Splash> splash = new ArrayList<Splash>();
ArrayList<Cloud> clouds = new ArrayList<Cloud>();
ArrayList<String> keys = new ArrayList<String>();

void setup() {
  size(700,500);
  
  surface.setResizable(true);
  clouds.add(new Cloud(width/2,height/2, 2));
}

void draw() {
  background(0);
  
  for (Cloud c: clouds)
    c.display();
  
  for (int i = splash.size()-1; i >= 0; i--) {
    splash.get(i).display();
    
    if (splash.get(i).lifeTime <= 0)
      splash.remove(splash.get(i));
  }
}

void mousePressed() {
  for (Cloud c: clouds) {
    if (c.contains(mouseX,mouseY)) {
      c.click = true;
    }
  }
  
  if (mouseButton == RIGHT) {
    clouds.add(new Cloud(mouseX,mouseY, 2));
  }
}

void mouseReleased() {
  for (Cloud c: clouds) {
    c.click = false;
  }
}

void keyPressed() {
  if (!keys.contains(Integer.toString(keyCode))) 
    keys.add(Integer.toString(keyCode));
}

void keyReleased() {
  keys.remove(Integer.toString(keyCode));
}
