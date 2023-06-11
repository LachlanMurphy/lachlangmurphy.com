class Boy {
  PVector pos;
  PVector vel;
  PVector acc;
  
  boolean action;
  
  float bodyRotation;
  
  // Offsets the animationso that it always starts at the animation's start
  int offset;
  
  // Keep track of all the individual actions
  boolean walkAct;
  boolean cryAct;
  boolean cartWheelAct;
  boolean sitAct;
  
  int maxActLen;
  int actLen;
  
  PImage body;
  
  PImage[] walk = {
    loadImage("Walk/boy1.png"),
    loadImage("Walk/boy2.png"),
    loadImage("Walk/boy3.png")
  };
  
  PImage[] crySprite = {
    loadImage("Cry/cry1.png"),
    loadImage("Cry/cry2.png"),
    loadImage("Cry/cry3.png")
  };
  
  PImage[] cartWheelSprite = {
    loadImage("CartWheel/CartWheel1.png")
  };
  
  PImage[] sitSprite = {
    loadImage("Sit/Sit1.png"),
    loadImage("Sit/Sit2.png"),
    loadImage("Sit/Sit3.png"),
    loadImage("Sit/Sit4.png"),
    loadImage("Sit/Sit5.png")
  };
  
  Boy() {
    pos = new PVector(width/2,height/2);
    vel = new PVector(0,0);
    acc = new PVector(0,0);
    
    action = false;
    
    bodyRotation = 0;
    
    offset = 0;
    
    body = loadImage("Walk/boy1.png");
  }
  
  void display() {
    vel.add(acc);
    pos.add(vel);
    
    push();
    translate(pos.x,pos.y);
    rotate(bodyRotation);
    image(body, -body.width/2,-body.height/2);
    pop();
  }
  
  void act() {
    actLen = 0;
    action = true;
    switch((int)random(0,4)) {
      case 0:
        // Move in a random direction
        maxActLen = (int)random(100,200);
        walkAct = true;
        vel = PVector.random2D();
        vel.mult(random(1,2));
      break;
      case 1:
        // Cry
        maxActLen = (int)random(1,3) + 1;
        offset = frameCount;
        cryAct = true;
      break;
      case 2:
        // Cartwheel
        maxActLen = (int)random(1,3) * 4 + 2;
        cartWheelAct = true;
        offset = frameCount;
        vel = PVector.random2D();
        vel.mult(random(1,2));
      break;
      case 3:
        // Sitting
        maxActLen = (int)random(5,9) + 6;
        sitAct = true;
        offset = frameCount;
      break;
    }
  }
  
  void actBreak() {
    noAct();
    vel.set(0,0);
  }
  
  void noAct() {
    action = false;
    cryAct = false;
    cartWheelAct = false;
    walkAct = false;
    sitAct = false;
    bodyRotation = 0;
    offset = 0;
    body = walk[0];
  }
  
  void edges() {
    if (boy.pos.x + body.width/2 > width)
      boy.pos.x = width-body.width/2;
    if (boy.pos.x - body.width/2 < 0)
      boy.pos.x = body.width/2;
    
    if (boy.pos.y + body.height/2 > height)
      boy.pos.y = height-body.height/2;
    if (boy.pos.y - body.height/2 < 0)
      boy.pos.y = body.height/2;
  }
  
  
  // All of the actions
  void walk() {
    if (vel.mag() > 0 && walkAct) {
      actLen++;
      body = walk[(int)(frameCount % 30 / 10)];
    }
  }
  
  void followMouse() {
    action = true;
    if (dist(mouseX,mouseY,pos.x,pos.y) > 2)
      vel = PVector.sub(new PVector(mouseX,mouseY),pos).setMag(2);
  }
  
  void cry() {
    if (cryAct) {
      if ((frameCount - offset) % 300 == 0) actLen++;
      body = crySprite[(int)((frameCount - offset) % 300 / 100)];
    }
  }
  
  void cartWheel() {
    if (cartWheelAct) {
      body = cartWheelSprite[0];
      if ((frameCount - offset) % 15 == 0) {
        actLen++;
        if (vel.x > 0)
          bodyRotation += PI/2;
        else
          bodyRotation -= PI/2;
      }
    }
  }
  
  void sit() {
    if (sitAct) {
      if ((frameCount - offset) % 100 == 0) actLen++;
      if (actLen >= 5) {
        if (actLen == maxActLen - 1)
          body = sitSprite[2];
        else
          body = sitSprite[4];
      } else {
        body = sitSprite[(int)((frameCount - offset) % 500 / 100)];
      }
    }
  }
}
