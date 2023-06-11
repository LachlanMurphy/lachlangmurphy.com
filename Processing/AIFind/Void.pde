class Void {
  PVector pos;
  
  float r;
  
  Void(int x, int y, int r) {
    pos = new PVector(x,y);
    this.r = r;
  }
  
  void display() {
    fill(100,100,255);
    circle(pos.x,pos.y,r*2);
  }
  
  boolean hit(PVector player) {
    if (PVector.sub(player,pos).mag() < r+10/2/*player radius*/)
      return true;
    return false;
  }
}
