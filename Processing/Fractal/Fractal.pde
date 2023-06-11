ArrayList<Tree> trees = new ArrayList<Tree>();

void setup() {
  size(1000,1000);
  
  trees.add(new Tree(width/2,2*height/3, 255));
}

void draw() {
  background(0);
  for (Tree t: trees) {
    t.dTheta = map(frameCount%1000,0,1000,0,PI);
    PVector mouse = PVector.sub(new PVector(mouseX,mouseY), t.pos);
    t.display(mouse.heading());
  }
}

void mousePressed() {
  trees.add(new Tree(mouseX,mouseY, color(random(255),random(255),random(255))));
}
