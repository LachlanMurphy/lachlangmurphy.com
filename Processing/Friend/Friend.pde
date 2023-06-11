Boy boy;

ArrayList<Character> keys;

void setup() {
  size(1000,700);
  surface.setResizable(true);
  
  boy = new Boy();
  
  keys = new ArrayList<>();
}

void draw() {
  drawBackground();
  
  if (!boy.action && random(1) > 0.99) {
    boy.act();
  }
  if (boy.action) {
    if (boy.actLen >= boy.maxActLen)
      boy.actBreak();
  }
  if (mousePressed) {
    boy.noAct();
    boy.walkAct = true;
    boy.followMouse();
  }
  
  if (boy.action) {
    boy.walk();
    boy.cry();
    boy.cartWheel();
    boy.sit();
  } else {
    boy.body = boy.walk[0];
  }
  boy.edges();
  boy.display();
}

void drawBackground() {
  background(255);
}

void keyPressed() {
  if (!keys.contains(key)) {
    keys.add(key);
  }
}

void keyReleased() {
  keys.remove(Character.valueOf(key));
}

void mouseReleased() {
  boy.actBreak();
}
