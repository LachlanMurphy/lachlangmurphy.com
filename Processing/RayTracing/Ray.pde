class Ray {
  PVector dir;
  PVector org;
  float angle;
  
  Ray(PVector pos, float a) {
    dir = PVector.fromAngle(a);
    org = pos;
    angle = a;
  }
  
  void display() {
    stroke(255);
    
    PVector pt = new PVector(Float.POSITIVE_INFINITY,Float.POSITIVE_INFINITY);
    for (Boundary b: bounds) {
      PVector test = cast(b);
      if (test != null && PVector.sub(test,org).mag() < PVector.sub(pt,org).mag())
        pt = test.copy();
    }
    
    if (pt != null) {
      line(org.x,org.y,pt.x,pt.y);
    }
  }
  
  PVector cast(Boundary b) {
    float x1 = org.x;
    float y1 = org.y;
    float x2 = org.x+dir.x;
    float y2 = org.y+dir.y;
    float x3 = b.a.x;
    float y3 = b.a.y;
    float x4 = b.b.x;
    float y4 = b.b.y;
    
    float den = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
    if (den == 0) return null;
    
    float t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4)) / den;
    float u = ((x1-x3)*(y1-y2)-(y1-y3)*(x1-x2)) / den;
    
    if (u > 0 && u <= 1 && t > 0) {
      return new PVector(x3+u*(x4-x3),y3+u*(y4-y3));
    }
    
    return null;
  }
  
  int getDis() {
    PVector pt = new PVector(Float.POSITIVE_INFINITY,Float.POSITIVE_INFINITY);
    for (Boundary b: bounds) {
      PVector test = cast(b);
      if (test != null && PVector.sub(test,org).mag() < PVector.sub(pt,org).mag())
        pt = test.copy();
    }
    return (int)(PVector.dist(pt,org));
  }
  
  Boundary getObj() {
    PVector pt = new PVector(Float.POSITIVE_INFINITY,Float.POSITIVE_INFINITY);
    Boundary bc = null;
    for (Boundary b: bounds) {
      PVector test = cast(b);
      if (test != null && PVector.sub(test,org).mag() < PVector.sub(pt,org).mag()) {
        pt = test.copy();
        bc = b;
      }
    }
    return bc;
  }
  
  color getCol() {
    PVector pt = new PVector(Float.POSITIVE_INFINITY,Float.POSITIVE_INFINITY);
    Boundary close = null;
    for (Boundary b: bounds) {
      PVector test = cast(b);
      if (test != null && PVector.sub(test,org).mag() < PVector.sub(pt,org).mag()) {
        pt = test.copy();
        close = b;
      }
    }
    if (close != null)
      return close.col;
    return color(0);
  }
}
