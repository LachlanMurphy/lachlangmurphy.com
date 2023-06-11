/*
 * Class to make bullets
 */
class Bullet {
  float x,y,theta;
  float mag;
  boolean collide;
  Ship ship;
  
  Bullet(Ship ship_) {
    ship = ship_; // Inherited ship
    
    // Initial coordinates
    x = ship.point1[0];
    y = ship.point1[1];
    theta = ship.theta;
    
    collide = false;
    mag = 0; // Keep track of how far it has gone
  }
  
  void step() {
    x = x + 10*cos(theta);
    y = y + 10*sin(theta);
    mag = mag + 10;
  }

  void display() {
    fill(255);
    ellipse(x,y,5,5);
  }
  
  boolean collide(Rock rock) {
    if (dist(x,y,rock.pos.x,rock.pos.y) < rock.size - 5/*radius of bullet*/) {
      return true;
    } else {
      return false;
    }
  }
}
