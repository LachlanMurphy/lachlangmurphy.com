Player[] players = new Player[20];

Wall[] walls = new Wall[0];

Void[] voids = new Void[0];

PVector goal; // This is the poin that the dots want to move to

int gens; // Keeps track of the # of generations
int geneGens; // Keeps track of how many generatoins are needed to reach the goal

final int STEP = 5; // How far each step the individuals take, larger value means faster learning but a little more messy

boolean stopStep = false; // Check if the goal has been reached, if it has we don't need to increase the number of instructions for the genes
int numReached = 0; // will set something off if the mom and dad have already been chosen

int minScore = 0;

void setup() {
  size(500,500);
  
  for (int i = 0; i < players.length; i++) {
    players[i] = new Player();
  }
  
  //voids[0] = new Void(140,140,30);
  //walls[0] = new Wall(100,100,100,20);
  //walls[1] = new Wall(100,120,20,80);
  
  
  
  goal = new PVector(80,80);
  
  gens = 0;
  geneGens = 0;
}

void draw() {
  background(0);
  
  
  int numDead = 0;
  for (Player p: players) {
    p.display();
    if (p.dead) numDead++;
  }
  
  if (numDead == players.length || numReached > 1) {
    mutate();
  }
  
  for (Wall w: walls) {
    w.display();
  }
  
  for (Void v: voids) {
    v.display();
  }
  
  fill(255,0,0);
  circle(goal.x,goal.y,10);
  
  textAlign(CENTER,CENTER);
  textSize(40);
  stroke(255);
  fill(255);
  text("GEN: " + gens + "; MIN SCORE: " + minScore,width/2,height-100);
}

void mutate() {
  for (int i = 0; i < players.length; i++) {
    if (!players[i].dead) {
      players[i].score = players[i].move * (int)PVector.sub(goal,players[i].pos).mag();
      players[i].dead = true;
    }
  }
  
  // We want to find the two dots that got the closest to the goal
  Player dad = players[0];
  Player mom = players[1];
  for (int i = 2; i < players.length; i++) {
    if (players[i].score < dad.score) {
      dad = players[i];
    } else if (players[i].score < mom.score) {
      mom = players[i];
    }
  }
  
  // With those two dots we want to base the next generation off of them
  for (int i = 0; i < players.length; i++) {
    if (i % 2 == 0) {
      players[i] = new Player(dad.gene,mom.gene);
    } else {
      players[i] = new Player(dad.gene,mom.gene, true);
    }
  }
  
  minScore = (int)dad.score;
  
  // Garbage collection is very important when working with genetic algorithms!
  dad = null;
  mom = null;
  System.gc();
  
  if (!stopStep)
    geneGens++;
  gens++;
  numReached = 0;
}
