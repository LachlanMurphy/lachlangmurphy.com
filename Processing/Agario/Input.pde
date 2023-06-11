class Input {
  PVector pos;
  String content;
  
  float w,h;
  
  boolean selected = false;
  
  Input(float x, float y, float w, float h) {
    pos = new PVector(x,y);
    content = new String();
    this.w = w;
    this.h = h;
  }
  
  void display() {
    fill(0);
    textSize(70);
    if (selected)
      stroke(0,255,0);
    strokeWeight(4);
    rect(pos.x-w/2,pos.y-h/2,w,h);
    fill(255);
    text(content,pos.x,pos.y);
  }
  
  void addContent(char k, int code) {
    if (selected) {
      if (k == BACKSPACE && content.length() != 0)
        content = content.substring(0, content.length() - 1);
      else if (code != 16 && k != ENTER && k != BACKSPACE)
        content += k;
    }
  }
  
  boolean contains(float x, float y) {
    if (x < pos.x+w/2 &&
        x > pos.x-w/2 &&
        y < pos.y+h/2 &&
        y > pos.y-h/2) {
      return true;
    }
    
    return false;
  }
}
