class Cell {
  int x;
  int y;
  int value;
  
  boolean reveal;
  boolean flag;
  
  Cell(int x, int y) {
    this.x = x;
    this.y = y;
    value = 0;
    
    reveal = false;
    flag = false;
  }
}
