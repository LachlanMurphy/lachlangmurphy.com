Ball ball;
Wall[] walls = new Wall[4];

ArrayList<Character> keys;

void setup() {
  size(700,500);
  background(0);
  
  ball = new Ball(width/2,height/2,20);
  
  walls[0] = new Wall(100,100,20,height-200);
  walls[1] = new Wall(100, 80, width-200,20);
  walls[2] = new Wall(100, height-100, width-200,20);
  walls[3] = new Wall(width-120,100,20,height-200);
  
  keys = new ArrayList<>();
}

void draw() {
  fill(0,50);
  rect(0,0,width,height);
  
  ball.display();
  for (Wall w: walls) {
    w.display();
  }
  
  if (keys.contains('w'))
    ball.vel.y--;
  if (keys.contains('s'))
    ball.vel.y++;
  if (keys.contains('a'))
    ball.vel.x--;
  if (keys.contains('d'))
    ball.vel.x++;
  
}

void keyPressed() {
  if (!keys.contains(key)) {
    keys.add(key);
  }
}

void keyReleased() {
  keys.remove(keys.indexOf(key));
}
