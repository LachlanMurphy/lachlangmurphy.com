class Wall {
  PVector pos;
  float w,h;
  Boundary[] sides;
  color col;
  
  Wall(float x, float y, float w, float h, color col) {
    pos = new PVector(x,y);
    this.w = w;
    this.h = h;
    this.col = col;
    
    sides = new Boundary[4];
    sides[0] = new Boundary(pos.x,pos.y,pos.x+w,pos.y, col);
    sides[1] = new Boundary(pos.x+w,pos.y,pos.x+w,pos.y+h, col);
    sides[2] = new Boundary(pos.x+w,pos.y+h,pos.x,pos.y+h, col);
    sides[3] = new Boundary(pos.x,pos.y+h,pos.x,pos.y, col);
    for (Boundary b: sides)
      bounds.add(b);
  }
  
  void display() {
    noStroke();
    fill(col);
    rectMode(CORNER);
    rect(pos.x,pos.y,w,h);
  }
}
