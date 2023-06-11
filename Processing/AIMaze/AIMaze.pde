Ball[] balls = new Ball[10];

Maze maze;

int gens; // Keeps track of the # of generations
int geneGens; // Keeps track of how many generatoins are needed to reach the goal

int minScore = 0; // Keeps track of the minimum score
boolean stopStep = false;
int quickMutate = 0;

final int STEP = 5;

void setup() {
  size(700,500);
  background(0);
  
  for (int i = 0; i < balls.length; i++) {
    balls[i] = new Ball();
  }
  
  //// The maze
  Integer[][] mazeGrid = {
    {-1, -1, -1, -1, -1, -1, -1, -1, -1, -1},
    {-1, -2, 10, 20, -1, -1, -1, -1, -1, -1},
    {-1, -1, -1, 30, -1, -1, -1, -1, -1, -1},
    {-1, -1, -1, 40, 50, -1, -1, -1, -1, -1},
    {-1, -1, -1, -1, 60, -1, -1, -1, -1, -1},
    {-1, -1, -1, -1, 70, -1, -1, -1, -1, -1},
    {-1, -1, -1, -1, 80, 100, -1, -1, -1, -1},
    {-1, -1, -1, -1, 100, 100, -1, -1, -1, -1},
    {-1, -1, -1, -1, -1, -1, -1, -1, -1, -1},
    {-1, -1, -1, -1, -1, -1, -1, -1, -1, -1},
    {-1, -1, -1, -1, -1, -1, -1, -1, -1, -1},
    {-1, -1, -1, -1, -1, -1, -1, -1, -1, -1},
    {-1, -1, -1, -1, -1, -1, -1, -1, -1, -1},
    {-1, -1, -1, -1, -1, -1, -1, -1, -1, -1}
  };
  
  //Integer[][] mazeGrid = {
  //  {-1, -1, -1, -1, -1, -1, -1, -1, -1, -1},
  //  {-1, -2, 10, 10, 20, 30, 40, 50, 60, -1},
  //  {-1, 10, 20, 30, 40, 50, 60, 70, 80, -1},
  //  {-1, 20, 30, 40, 50, 60, 70, 80, 90, -1},
  //  {-1, 30, 40, 50, 60, 70, 80, 90, 90, -1},
  //  {-1, 40, 50, 60, 70, 80, 90, 90, 90, -1},
  //  {-1, 50, 60, 70, 80, 90, 90, 90, 90, -1},
  //  {-1, 60, 70, 80, 90, 90, 90, 90, 90, -1},
  //  {-1, 70, 80, 90, 90, 90, 90, 90, 90, -1},
  //  {-1, 80, 90, 90, 90, 90, 90, 90, 90, -1},
  //  {-1, 90, 90, 90, 90, 90, 90, 90, 90, -1},
  //  {-1, 100, 90, 90, 90, 90, 90, 90, 90, -1},
  //  {-1, 110, 90, 90, 90, 90, 90, 90, 90, -1},
  //  {-1, -1, -1, -1, -1, -1, -1, -1, -1, -1}
  //};
  
  maze = new Maze(mazeGrid, 50);
  
  gens = 0;
  geneGens = 0;
}

void draw() {
  fill(0,50);
  rect(0,0,width,height);
  
  maze.display();
  
  int numDead = 0;
  for (Ball b: balls) {
    b.display();
    for (Wall w: maze.walls) {
      w.hit(b);
    }
    
    if (b.dead) numDead++;
  }
  
  if (numDead == balls.length || quickMutate > 0)
    mutate();
  
  
  fill(0);
  textAlign(CENTER,CENTER);
  textSize(40);
  text("Gens: "+gens+" MinScore: "+minScore,width/2,height-100);
}

void mutate() {
  for (int i = 0; i < balls.length; i++) {
    if (!balls[i].dead) {
      balls[i].score = abs(maze.getScore(balls[i].pos) * balls[i].move);
      balls[i].dead = true;
    }
  }
  
  // We want to find the dot that got the closest to the goal
  Ball parent = balls[0];
  for (int i = 2; i < balls.length; i++) {
    if (balls[i].score < parent.score) {
      parent = balls[i];
    }
  }
  
  // Fill the next generation with new balls
  for (int i = 0; i < balls.length; i++) {
    if (i % 2 == 0)
      balls[i] = new Ball(parent); // Domminant child
    else
      balls[i] = new Ball(parent, true); // Recessive child
  }
  
  minScore = (int)parent.score;
  
  // Garbage collection is very important when working with genetic algorithms!
  parent = null;
  System.gc();
  
  if (!stopStep)
    geneGens++;
  gens++;
  
  quickMutate = 0;
}
