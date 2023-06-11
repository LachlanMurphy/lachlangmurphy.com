class Apple {
  PVector pos = new PVector(0,0);
  
  Apple(float x, float y) {
    pos.x = x;
    pos.y = y;
  }
  
  void move() {
    pos.x = random(20,width-20);
    pos.y = random(20,height-400);
  }
  
  void display() {
    push();
    translate(pos.x,pos.y);
    noStroke();
    fill(255,100,100);
    circle(0,0,50);
    stroke(0);
    noFill();
    strokeWeight(4);
    arc(0+25,0-20,50,50,PI,6*PI/5);
    pop();
  }
}
