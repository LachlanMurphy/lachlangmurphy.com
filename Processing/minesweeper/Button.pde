class Button {
  PVector pos;
  float w,h;
  String text;
  color col;
  int type;
  
  Button(String text, float x, float y, color col, int type) {
    pos = new PVector(x,y);
    
    w = 150;
    h = 50;
    this.type = type;
    
    this.text = text;
    
    this.col = col;
  }
  
  void display() {
    fill(col);
    rect(pos.x,pos.y,w,h);
    fill(255);
    text(text,pos.x+w/2,pos.y+h/2);
  }
  
  void click() {
    if (mouseX >= pos.x &&
        mouseX <= pos.x+w &&
        mouseY >= pos.y &&
        mouseY <= pos.y+h &&
        !gameOn
       ) {
      difficulty = type; // If clicked set the difficulty
      instantiateBoard();
    }
  }
}
