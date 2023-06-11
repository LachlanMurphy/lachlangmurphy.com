ArrayList<Boundary> bounds;
ArrayList<Wall> walls;

Player p;

final int sceneW = 700;

ArrayList<Character> keys;

void setup() {
  size(1400,700);
  
  bounds = new ArrayList<>();
  //for (int i = 0; i < 5; i++) {
  //  bounds.add(new Boundary(random(sceneW),random(height),random(sceneW),random(height), color(random(255),random(255),random(255))));
  //}
  
  bounds.add(new Boundary(0,0,sceneW,0));
  bounds.add(new Boundary(sceneW,0,sceneW,height));
  bounds.add(new Boundary(sceneW,height,0,height));
  bounds.add(new Boundary(0,0,0,height));
  
  walls = new ArrayList<>();
  walls.add(new Wall(200,200,300,40, color(0,100,0)));
  
  p = new Player();
  
  keys = new ArrayList<>();
}

void draw() {
  background(0);
  
  for (Boundary b: bounds)
    b.display();
  for (Wall w: walls)
    w.display();
  p.display();
}

void keyPressed() {
  if (!keys.contains(key))
    keys.add(key);
}

void keyReleased() {
  keys.remove(keys.indexOf(key));
}
