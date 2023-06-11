class Ball {
  PVector pos;
  PVector vel;
  PVector acc;
  
  float r;
  color col;
  
  int[] gene;
  int move; // Keeps track of which part of the gene to move
  boolean dead;
  double score;
  
  void defaultSettings() {
    pos = new PVector(width/2,height/2);
    vel = new PVector(0,0);
    acc = new PVector(0,0);
    r = 10;
    col = color(255);
    move = 0;
    dead = false;
    score = 0;
  }
  
  Ball() {
    defaultSettings();
    
    gene = new int[200];
    for (int i = 0; i < gene.length; i++) {
      gene[i] = (int)random(4);
    }
  }
  
  // Dominent child
  Ball(Ball parent) {
    defaultSettings();
    col = color(0,255,0);
    
    gene = new int[200+(geneGens*100)];
    for (int i = 0; i < parent.gene.length; i++) {
      if (random(1) < 0.005)
        gene[i] = (int)random(4);
      else
        gene[i] = parent.gene[i];
    }
    // The crucial part of growth, there will be new instructions that will make the group learn
    for (int i = parent.gene.length; i < gene.length; i++) {
      gene[i] = (int)random(4);
    }
  }
  
  // Recessive child
  Ball(Ball parent, boolean t) {
    defaultSettings();
    col = color(255,0,0);
    
    gene = new int[200+(geneGens*100)];
    for (int i = 0; i < parent.gene.length; i++) {
      if (random(1) < 0.01)
        gene[i] = (int)(Math.random()*4);
      else
        gene[i] = parent.gene[i];
    }
    // The crucial part of growth, there will be new instructions that will make the group learn
    for (int i = parent.gene.length; i < gene.length; i++) {
      gene[i] = (int)(Math.random()*4);
    }
  }
  
  void display() {
    
    if (!dead && maze.getScore(pos) == -2) {
      dead = true;
      score = move;
      acc.set(0,0);
      stopStep = true;
      quickMutate++;
    }
    
    if (move < gene.length && !dead) {
      switch(gene[move]) {
        case 0:
          vel.set(STEP,0);
        break;
        case 1:
          vel.set(0,STEP);
        break;
        case 2:
          vel.set(-STEP,0);
        break;
        case 3:
          vel.set(0,-STEP);
        break;
      }
      move++;
    } else if (!dead) {
      score = maze.getScore(pos) * move;
      dead = true;
    }
    
    vel.add(acc);
    vel.mult(0.9);
    pos.add(vel);
    
    fill(col);
    circle(pos.x,pos.y,r*2);
  }
}
