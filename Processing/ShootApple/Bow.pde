class Bow {
  PVector pos = new PVector(0,0);
  PVector hed = new PVector(0,0);
  PVector pwr = new PVector(0,0);
  
  Bow(float x, float y) {
    pos.set(x,y);
  }
  
  void display() {
    hed.set(pos.x-mouseX,pos.y-mouseY);
    pwr.set(mouseX-pos.x,mouseY-pos.y);
    if (pwr.mag() > 50) {
      pwr.setMag(50);
    }
    
    // Draw arrow path
    fill(255);
    PVector tempPos = pos.copy();
    tempPos.add(pwr);
    tempPos.x += 80*cos(hed.heading());
    tempPos.y += 80*sin(hed.heading());
    PVector tempVel = pwr.copy();
    PVector gravity = new PVector(0,1);
    tempVel.setMag(map(pwr.copy().mag(),0,50,0,45));
    tempVel.mult(-1);
    if (pwr.mag() != 0) {
      for (int i = 0; i < 15; i++) {
        ellipse(tempPos.x,tempPos.y,5,5);
        tempVel.add(gravity);
        tempPos.add(tempVel);
      }
    }
    
    // Draw the bow
    stroke(0);
    strokeWeight(4);
    noFill();
    line(pos.x+25*cos(hed.heading()-PI/4),pos.y+25*sin(hed.heading()-PI/4), pwr.x+pos.x,pwr.y+pos.y);
    line(pos.x+25*cos(hed.heading()+PI/4),pos.y+25*sin(hed.heading()+PI/4), pwr.x+pos.x,pwr.y+pos.y);
    arc(pos.x,pos.y,50,50,hed.heading()-PI/4,hed.heading()+PI/4);
    
    // Draw the arrow
    line(pwr.x+pos.x,pwr.y+pos.y, pwr.x+pos.x+80*cos(hed.heading()),pwr.y+pos.y+80*sin(hed.heading()));
  }
}
