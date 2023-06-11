class SplashDrop {
  PVector pos;
  PVector vel = new PVector(1,1);
  PVector acc;
  Splash s;
  
  SplashDrop(Splash s) {
    pos = new PVector(s.x,height);
    vel.setMag(random(1.5,2.5));
    float m = vel.mag();
    float theta = random(-3*PI/4,PI/4);
    vel.x = m*cos(theta);
    vel.y = m*sin(theta);
    acc = new PVector(0,0.1);
    this.s = s;
  }
  
  void display() {
    vel.add(acc);
    pos.add(vel);
    
    fill(255);
    circle(pos.x,pos.y,5*s.d.z);
  }
}
