class Firework {
  PVector pos = new PVector(random(20,width-20),height);
  PVector vel = new PVector(random(-1,1),-random(5,10));
  int lifeTime = (int)random(30,height/10);
  
  void show() {
    pos.add(vel);
    lifeTime--;
    
    push();
    translate(pos.x,pos.y);
    rotate(PI/3*frameCount);
    fill(255);
    ellipse(5*cos(0),5*sin(0), 10,10);
    pop();
  }
}
