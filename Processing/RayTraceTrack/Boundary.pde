class Boundary {
  PVector a;
  PVector b;
  float h;
  
  color col;
  
  Boundary(float x1, float y1, float x2, float y2) {
    a = new PVector(x1,y1);
    b = new PVector(x2,y2);
    
    col = color(255);
    
    h = 100;
  }
  
  Boundary(float x1, float y1, float x2, float y2, color c) {
    a = new PVector(x1,y1);
    b = new PVector(x2,y2);
    
    this.col = c;
    
    h = 100;
  }
  
  
  void display() {
    stroke(col);
    line(a.x,a.y,b.x,b.y);
  }
  
  float getLen() {
    return PVector.sub(b,a).mag();
  }
}
