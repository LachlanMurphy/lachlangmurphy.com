Player[] players;

ArrayList<Wall> walls;
ArrayList<Boundary> bounds;

PVector goal;

int time = 0;
int minTime = Integer.MAX_VALUE;

void setup() {
  size(700,500);
  
  players = new Player[10];
  for (int i = 0; i < players.length; i++) {
    players[i] = new Player();
  }
  
  bounds = new ArrayList<>();
  bounds.add(new Boundary(0,0,width,0));
  bounds.add(new Boundary(width,0,width,height));
  bounds.add(new Boundary(width,height,0,height));
  bounds.add(new Boundary(0,0,0,height));
  bounds.add(new Boundary(100,0,100,100));
  
  walls = new ArrayList<>();
  walls.add(new Wall(100,100,width-200,height-200, color(100,100,150)));
  
  walls.add(new Wall(-20,0,20,height, color(255)));
  walls.add(new Wall(0,-20,width,20, color(255)));
  walls.add(new Wall(width,0,20,height, color(255)));
  walls.add(new Wall(0,height,width,20, color(100,100,150)));
  
  
  goal = new PVector(200,50);
}

void draw() {
  background(0);
  
  for (Player p: players) {
    p.display();
    if (PVector.sub(p.pos,goal).mag() < p.r+15) {
      mutate(p);
    }
  }
  for (Boundary b: bounds)
    b.display();
  for (Wall w: walls)
    w.display();
  fill(255,0,0);
  circle(goal.x,goal.y,30);
  
  time++;
}

void mutate(Player dad) {
  
  // With those two dots we want to base the next generation off of them
  for (int i = 0; i < players.length; i++) {
    if (i == 0)
      players[i] = new Player(dad);
    else
      players[i] = new Player(dad,true);
  }
  
  println("Range: " + dad.range +" "+ "Shift Mag: "+dad.shiftMag);
  
  // Garbage collection is very important when working with genetic algorithms!
  dad = null;
  System.gc();
  
  //if (!stopStep)
  //  geneGens++;
  //gens++;
  //numReached = 0;
  
  if (time < minTime) minTime = time;
  println(minTime);
  time = 0;
}
