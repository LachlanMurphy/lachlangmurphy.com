class Button {
  PVector pos = new PVector(0,0);
  String text;
  float w,h;
  String align;
  int r,g,b;
  
  Button(float x, float y, String text_, float w_, float h_) {
    pos.x = x;
    pos.y = y;
    
    r = 0;
    g = 0;
    b = 0;
    
    w = w_;
    h = h_;
    
    text = text_;
  }
  
  void display() {
    fill(r,g,b);
    rect(pos.x,pos.y,w,h,9);
    textSize(32);
    textAlign(CENTER,CENTER);
    fill(255);
    text(text, pos.x + w/2,pos.y + h/2);
  }
  
  void displayI() {
    fill(255-r,255-g,255-g);
    rect(pos.x,pos.y,w,h,9);
    textAlign(CENTER,CENTER);
    fill(0);
    text(text, pos.x + w/2,pos.y + h/2);
  }
  
  boolean contains(float x,float y) {
    if (x <= pos.x+w && x >= pos.x && y <= pos.y+h && y >= pos.y) {
      return true;
    } else {
      return false;
    }
  }
}
