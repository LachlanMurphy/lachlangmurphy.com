class Player {
  PVector pos;
  PVector vel;
  PVector acc;
  
  ArrayList<Ray> rays;
  
  float r;
  
  color col;
  
  // The AI network nobs to turn
  int range;
  final int rangeStep = 10;
  float disMul;
  final float disMulStep = 0;
  float shiftMag;
  final float shiftMagStep = 0;
  
  Player() {
    pos = new PVector(40,40);
    vel = new PVector(0,2);
    acc = new PVector(0,0);
    
    
    rays = new ArrayList<>();
    for (float i = 0; i < TAU; i += PI/12)
      rays.add(new Ray(pos,i));
    
    range = (int)random(40,100);
    disMul = random(0.001, 1);
    shiftMag = random(0.001,0.1);
    
    r = 15;
    
    col = color(255);
  }
  
  // Domminent child
  Player(Player dad) {
    pos = new PVector(40,40);
    vel = new PVector(0,2);
    acc = new PVector(0,0);
    
    rays = new ArrayList<>();
    for (float i = 0; i < TAU; i += PI/12)
      rays.add(new Ray(pos,i));
    
    range = dad.range;
    disMul = dad.disMul;
    shiftMag = dad.shiftMag;
    
    r = 15;
    
    col = color(0,255,0);
  }
  
  // Reccessive child
  Player(Player dad, boolean t) {
    pos = new PVector(40,40);
    vel = new PVector(0,2);
    acc = new PVector(0,0);
    
    rays = new ArrayList<>();
    for (float i = 0; i < TAU; i += PI/12)
      rays.add(new Ray(pos,i));
    
    range = dad.range + (int)random(-rangeStep,rangeStep);
    disMul = dad.disMul + random(-disMulStep,disMulStep);
    shiftMag = dad.shiftMag + random(-shiftMagStep,shiftMagStep);
    
    r = 15;
    
    col = color(255,0,0);
  }
  
  void display() {
    for (Ray r: rays) {
      //r.display();
      if (r.getDis() < range)
        vel.add(r.dir.copy().mult(-shiftMag * map(r.getDis(), width, 0, 0,disMul)));
    }
    vel.limit(10);
    vel.add(acc);
    pos.add(vel);
    
    stroke(col);
    noFill();
    push();
    translate(pos.x,pos.y);
    rotate(vel.heading());
    triangle(20*cos(3*PI/4),20*sin(3*PI/4),20*cos(-3*PI/4),20*sin(-3*PI/4),40,0);
    circle(0,0,r*2);
    pop();
    
    for (Wall w: walls)
      w.hit(this);
  }
}
