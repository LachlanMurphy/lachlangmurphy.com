/*
 * Class for the ship
 */
class Ship {
  // Direction
  float r,theta;
  // Momentum
  float mX = 0;
  float mY = 0;
  // Center
  float center[] = new float[2];
  // Points of the triangle
  float point1[] = new float[2];
  float point2[] = new float[2];
  float point3[] = new float[2];
  // Points of the boost triangle
  float boostPoint1[] = new float[2];
  float boostPoint2[] = new float[2];
  float boostPoint3[] = new float[2];
  
  Ship(float x_, float y_) {
    theta = 0;
    
    center[0] = x_;
    center[1] = y_;
  }
  
  
  void display() {
    // Defines where each point of the triangle is
    point1[0] = center[0] + 35*cos(theta);
    point1[1] = center[1] + 35*sin(theta);
    
    point2[0] = center[0] + 15*cos(theta+2*(float)Math.PI/3);
    point2[1] = center[1] + 15*sin(theta+2*(float)Math.PI/3);
    
    point3[0] = center[0] + 15*cos(theta-2*(float)Math.PI/3);
    point3[1] = center[1] + 15*sin(theta-2*(float)Math.PI/3);
    
    // Draw the triangle.
    stroke(255);
    line(point1[0],point1[1],point2[0],point2[1]);
    line(point1[0],point1[1],point3[0],point3[1]);
    line(point2[0],point2[1],point3[0],point3[1]);
    
  }
  
  void boost() {
    // Moves the ship in the direction of the boost
    ship.mX = ship.mX + 1*cos(theta);
    ship.mY = ship.mY + 1*sin(theta);
  }
  
  void drawBoost() {
    // Assign boost triangel points
    boostPoint1[0] = center[0] + 35*cos(theta+(float)Math.PI);
    boostPoint1[1] = center[1] + 35*sin(theta+(float)Math.PI);
    
    boostPoint2[0] = center[0] + 10*cos(theta+5*(float)Math.PI/6);
    boostPoint2[1] = center[1] + 10*sin(theta+5*(float)Math.PI/6);
    
    boostPoint3[0] = center[0] + 10*cos(theta-5*(float)Math.PI/6);
    boostPoint3[1] = center[1] + 10*sin(theta-5*(float)Math.PI/6);
    
    // Draw boost triangle
    stroke(255,0,0);
    line(boostPoint1[0],boostPoint1[1],boostPoint2[0],boostPoint2[1]);
    line(boostPoint1[0],boostPoint1[1],boostPoint3[0],boostPoint3[1]);
    line(boostPoint2[0],boostPoint2[1],boostPoint3[0],boostPoint3[1]);
  }
}
