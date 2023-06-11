class Gem {
  PVector pos = new PVector(0,0);
  
  Gem(Enemy enemy) {
    pos.x = enemy.pos.x+5;
    pos.y = enemy.pos.y+5;
  }
  
  void display() {
    fill(100,255,150);
    rect(pos.x,pos.y,10,10);
  }
}
