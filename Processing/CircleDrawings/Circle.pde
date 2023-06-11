class Circle {
  PVector pos;
  float r;
  float t;
  float a;
  
  Circle(float x, float y, float r, float t) {
    pos = new PVector(x,y);
    this.r = r;
    this.t = t;
    a = 0;
  }
  
  void display() {
    a += t + random(-t*0.1,t*0.1);
    
    
    noFill();
    stroke(255);
    ellipse(pos.x,pos.y,r*2,r*2);
    stroke(0,255,0);
    push();
    translate(pos.x,pos.y);
    rotate(a);
    line(0,0,r,0);
    pop();
  }
}
