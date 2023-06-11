class Arrow {
  PVector pos = new PVector(0,0);
  PVector vel = new PVector(0,0);
  PVector tail = new PVector(0,0);
  PVector gravity = new PVector(0,1);
  boolean hit = false;
  
  Arrow(Bow bow) {
    pos = bow.pos.copy();
    pos.add(bow.pwr);
    pos.x += 80*cos(bow.hed.heading());
    pos.y += 80*sin(bow.hed.heading());
    
    vel.set(bow.hed.copy());
    vel.setMag(map(bow.pwr.copy().mag(),0,50,0,45));
  }
  
  boolean checkApple(Apple apple) {
    if (PVector.sub(apple.pos,pos).mag() < 25) {
      return true;
    }
    return false;
  }
  
  void checkGround(PVector ground, PVector ground0) {
    // Get difference between orb and ground
    float deltaX = pos.x - ground.x;
    float deltaY = pos.y - ground.y;

    // Precalculate trig values
    float rot = atan2((ground0.y-ground.y), (ground0.x-ground.x));
    float cosine = cos(rot);
    float sine = sin(rot);

    /* Rotate ground and velocity to allow 
     orthogonal collision calculations */
    float groundXTemp = cosine * deltaX + sine * deltaY;
    float groundYTemp = cosine * deltaY - sine * deltaX;
    float velocityXTemp = cosine * vel.x + sine * vel.y;
    float velocityYTemp = cosine * vel.y - sine * vel.x;

    /* Ground collision - check for surface 
     collision and also that orb is within 
     left/rights bounds of ground segment */
    if (groundYTemp > -4 &&
      pos.x > ground.x &&
      pos.x < ground0.x ) {
      hit  = true;
      //text(
    }

    // Reset ground, velocity and orb
    deltaX = cosine * groundXTemp - sine * groundYTemp;
    deltaY = cosine * groundYTemp + sine * groundXTemp;
    vel.x = cosine * velocityXTemp - sine * velocityYTemp;
    vel.y = cosine * velocityYTemp + sine * velocityXTemp;
    pos.x = ground.x + deltaX;
    pos.y = ground.y + deltaY;
  }
  
  void show() {
    if (hit == false) {
      vel.add(gravity);
      pos.add(vel);
    }
    
    tail = vel.copy();
    tail.mult(-1);
    tail.setMag(80);
    tail.add(pos);
    stroke(0);
    strokeWeight(4);
    line(pos.x,pos.y,tail.x,tail.y);
  }
}
