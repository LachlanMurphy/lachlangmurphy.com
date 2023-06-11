class Wall {
  PVector pos;
  int w,h;
  
  Wall(int x, int y, int w, int h) {
    pos = new PVector(x,y);
    this.w =  w;
    this.h = h;
  }
  
  void display() {
    fill(0,255,0);
    rect(pos.x,pos.y,w,h);
  }
  
  boolean intersects(PVector circle, float r) {
    PVector circleDistance = new PVector(abs(circle.x - pos.x), abs(circle.y - pos.y));

    if (circleDistance.x > (w + r)) { return false; }
    if (circleDistance.y > (h + r)) { return false; }

    if (circleDistance.x <= (w)) { return true; } 
    if (circleDistance.y <= (h)) { return true; }

    float cornerDistance_sq = pow((circleDistance.x - w), 2) + pow((circleDistance.y - h), 2);

    return (cornerDistance_sq <= (r*r));
  }
}
