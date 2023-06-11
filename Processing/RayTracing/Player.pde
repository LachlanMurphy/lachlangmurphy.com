class Player {
  PVector pos;
  PVector vel;
  PVector acc;
  
  ArrayList<Ray> rays;
  
  float fov;
  
  int qual = sceneW/10;
  
  float heading;
  
  Player() {
    pos = new PVector(sceneW/2,height/2);
    vel = new PVector(0,0);
    acc = new PVector(0,0);
    
    rays = new ArrayList<>();
    
    fov = PI/2;
    
    heading = fov / 2;
    
    for (float a = 0; a < fov; a += fov/qual) {
      rays.add(new Ray(pos,a));
    }
  }
  
  void turn(int s) {
    heading += s * PI / 100;
    for (Ray r: rays) {
      float a = r.dir.heading();
      a += s * PI / 100;
      r.dir = PVector.fromAngle(a);
    }
  }
  
  void move(int s) {
    acc = PVector.fromAngle(heading).mult(s*0.5);
  }
  
  void straif(int s) {
    acc = PVector.fromAngle(heading + PI/2).mult(s*0.5);
  }
  
  void display() {
    acc.set(0,0);
    if (keys.contains('a'))
      p.turn(-1);
    if (keys.contains('d'))
      p.turn(1);
    if (keys.contains('w'))
      p.move(1);
    if (keys.contains('s'))
      p.move(-1);
    if (keys.contains('x'))
      p.straif(1);
    if (keys.contains('z'))
      p.straif(-1);
    
    vel.add(acc);
    pos.add(vel);
    vel.mult(0.95);
    fill(255);
    circle(pos.x,pos.y,10);
    
    for (Ray r: rays) {
      r.display();
    }
    
    renderWorld();
  }
  
  void renderWorld() {
    // Sky
    fill(50,50,255);
    rect(sceneW,0,sceneW,height/2);
    
    // Floor
    fill(50);
    rect(sceneW,height/2,sceneW,height/2);
    
    int[] scene = new int[qual];
    Boundary[] bs = new Boundary[qual];
    color[] cols = new color[qual];
    
    for (int i = 0; i < scene.length; i++) {
      scene[i] = rays.get(i).getDis();
      bs[i] = rays.get(i).getObj();
      cols[i] = rays.get(i).getCol();
    }
    
    int step = sceneW/scene.length;
    for (int i = 0; i < scene.length; i++) {
      noStroke();
      if (scene[i] > sceneW) scene[i] = sceneW;
      float sq = scene[i] * scene[i];
      float wSq = sceneW * sceneW;
      float b = map(sq, 0, wSq*2, 255, 0) / 255;
      float h = map(scene[i], sceneW, 0, 0, height);
      //h = pow(scene[i], -1);
      //float h = 0;
      if (bs[i] != null) {
        //h = bs[i].h/scene[i];
        //h = ;
      }
      fill(red(cols[i])*b, green(cols[i])*b, blue(cols[i])*b);
      rectMode(CENTER);
      rect(i * step + sceneW + step/2, height / 2, step + 1, h);
    }
  }
}
