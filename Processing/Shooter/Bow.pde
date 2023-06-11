class Bow {
  PVector pos;
  boolean show;
  PVector bow;
  ArrayList<Arrow> arrows;
  ArrayList<Burst> bursts;
  
  Bow() {
    pos = new PVector(0,0);
    bow = new PVector(0,0);
    
    arrows = new ArrayList<>();
    bursts = new ArrayList<>();
    
    show = false;
  }
  
  void display() {
    stroke(0);
    strokeWeight(4);
    
    bow = PVector.sub(pos,new PVector(mouseX,mouseY)).limit(50).add(pos);
    line(pos.x,pos.y,bow.x,bow.y);
  }
  
  void shoot() {
    arrows.add(new Arrow(pos.x,pos.y,this));
  }
}
