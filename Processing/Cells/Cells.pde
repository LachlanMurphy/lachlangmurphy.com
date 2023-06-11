ArrayList<Cell> cells = new ArrayList<Cell>();

void setup() {
  size(700,500);
  surface.setResizable(true);
  frameRate(100);
  
  for (int i = 0; i < 5; i++)
    cells.add(new Cell(random(50,width-50),random(50,height-50),20));
}

void draw() {
  background(0);
  
  for (int i = cells.size()-1; i >= 0; i--) {
    for (Cell d: cells) {
      if (d != cells.get(i)) {
        cells.get(i).hit(d);
      }
    }
    cells.get(i).display();
    
    if (cells.get(i).r >= 40 && random(1) < 0.1) {
      cells.add(new Cell(cells.get(i).pos.x,cells.get(i).pos.y,20));
      cells.add(new Cell(cells.get(i).pos.x+40,cells.get(i).pos.y,20));
      cells.remove(cells.get(i));
    }
  }
}
