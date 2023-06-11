class Player {
  PVector pos;
  
  ArrayList<Ray> rays;
  
  int qual;
  
  Player() {
    pos = new PVector(width/2,height/2);
    
    rays = new ArrayList<>();
    
    qual = 1000;
    
    for (float a = 0; a <= TAU; a += TAU/qual) {
      rays.add(new Ray(pos,a));
    }
  }
  
  void display() {
    pos.set(mouseX,mouseY);
    
    fill(255);
    //strokeWeight(1);
    //for (Ray r: rays) r.display();
    beginShape();
    for (Ray r: rays) {
      //r.display();
      PVector hitPoint = r.getCastPoint();
      vertex(hitPoint.x,hitPoint.y);
    }
    endShape(CLOSE);
    
    fill(255,0,0);
    circle(pos.x,pos.y,10);
  }
}
