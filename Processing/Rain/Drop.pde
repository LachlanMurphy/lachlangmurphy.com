class Drop {
  PVector pos;
  PVector vel;
  PVector acc;
  Cloud c;
  float z;
  
  Drop(Cloud c) {
    this.c = c;
    z = random(0,1);
    
    pos = new PVector(c.pos.x+random(c.w*-50,c.w*50),c.pos.y);
    vel = new PVector(0,0);
    acc = new PVector(0,z*.5);
  }
  
  void display() {
    if (keys.contains("32"))
      vel.x += map(mouseX,0,width,-0.5,0.5);
    vel.add(acc);
    pos.add(vel);
    
    fill(255);
    rect(pos.x,pos.y,z*5,z*10, 100);
  }
}
