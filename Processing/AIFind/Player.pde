class Player {
  PVector pos;
  
  int[] gene;
  int move;
  float score;
  
  boolean dead;
  
  Player() {
    pos = new PVector(width/2,height/2);
    
    // The gene is the set of instructions the dot uses to move arround
    // Essentially it's just up down left or right, but a long array of that
    gene = new int[200];
    for (int i = 0; i < gene.length; i++) {
      gene[i] = (int)(Math.random()*4); // Initially their moves are random
    }
    
    move = 0;
    score = 0;
    
    dead = false;
  }
  
  // Constructor for dominant child
  Player(int[] dad, int[] mom) {
    pos = new PVector(width/2,height/2);
    
    gene = new int[200+(geneGens*100)];
    for (int i = 0; i < dad.length; i++) {
      // If the instructions are the same we want to keep it
      // Might add some randomness here to make it work a little better
      if (dad[i] == mom[i]) {
        gene[i] = dad[i];
      } else {
        // If they're not the same then we will randomly chose which one works
        if (random(1) < 0.5) {
          gene[i] = dad[i];
        } else {
          gene[i] = mom[i];
        }
      }
    }
    // The crucial part of growth, there will be new instructions that will make the group learn
    for (int i = dad.length; i < gene.length; i++) {
      gene[i] = (int)(Math.random()*4);
    }
    
    move = 0;
    score = 0;
    
    dead = false;
  }
  
  // Constructor for the recessive child, these guys are cool!
  Player(int[] dad, int[] mom, boolean t) { // Boolean t is never used, just there to have a different contructor
    pos = new PVector(width/2,height/2);
    
    gene = new int[200+(geneGens*100)];
    for (int i = 0; i < dad.length; i++) {
      if (random(1) < 0.1) {
        gene[i] = (int)(Math.random()*4);
      } else if (dad[i] == mom[i]) {
        gene[i] = dad[i];
      } else {
        if (random(1) < 0.5) {
          gene[i] = dad[i];
        } else {
          gene[i] = mom[i];
        }
      }
    }
    for (int i = dad.length; i < gene.length; i++) {
      gene[i] = (int)(Math.random()*4);
    }
    
    move = 0;
    score = 0;
    
    dead = false;
  }
  
  void display() {
    if (PVector.sub(pos,goal).mag() < 5+5 && !dead) {
      dead = true;
      score = move;
      stopStep = true;
      numReached++;
    }
    
    for (Void v: voids) {
      if (v.hit(pos)) {
        float a = PVector.sub(pos,v.pos).heading();
        
        pos.x = v.pos.x+(v.r+10)*cos(a);
        pos.y = v.pos.y+(v.r+10)*sin(a);
      }
    }
    
    for (Wall w: walls) {
      if (w.intersects(this.pos,5)) {
        switch(gene[move-1]) {
          case 0:
            pos.x -= STEP;
          break;
          case 1:
            pos.x += STEP;
          break;
          case 2:
            pos.y -= STEP;
          break;
          case 3:
            pos.y += STEP;
          break;
        }
      }
    }
    
    if (move < gene.length && !dead) {
      switch(gene[move]) {
        case 0:
          pos.x += STEP;
        break;
        case 1:
          pos.x -= STEP;
        break;
        case 2:
          pos.y += STEP;
        break;
        case 3:
          pos.y -= STEP;
        break;
      }
      move++;
    } else if (!dead) {
      // Assigns the individual a score based on how close it is to the goal
      //if (goalReached) {
      //  if (!reachGoal) {
      //    score = Integer.MAX_VALUE;
      //    dead = true;
      //  }
      //} else {
      //  score = dist(pos.x,pos.y,goal.x,goal.y);
      //  dead = true;
      //}
      score = move * (int)PVector.sub(goal,pos).mag();
      dead = true;
    }
    
    fill(255);
    circle(pos.x,pos.y,10);
  }
}
