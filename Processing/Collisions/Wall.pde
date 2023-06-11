class Wall {
  PVector pos;
  
  float w,h;
  color col;
  
  Wall(float x, float y, float w, float h) {
    pos = new PVector(x,y);
    this.w = w;
    this.h = h;
    col = color(random(255),random(255),random(255));
  }
  
  void display() {
    fill(col);
    rect(pos.x,pos.y,w,h);
  }
  
  void hit(Ball ball) {
    
    if (ball.pos.y > pos.y + h && ball.pos.y < pos.y + h + ball.r) {
      if (ball.pos.x >= pos.x && ball.pos.x <= pos.x + w) { // Bottom wall
        ball.pos.y = pos.y + h + ball.r;
        ball.vel.y *= -1;
      } else if (ball.pos.x < pos.x && ball.pos.x > pos.x - ball.r) { //  Bottom left corner
        bounceCorner(new PVector(pos.x,pos.y+h));
      } else if (ball.pos.x > pos.x + w && ball.pos.x < pos.x + w + ball.r) { // Bottom right corner
        bounceCorner(new PVector(pos.x+w,pos.y+h));
      }
    } else if (ball.pos.y < pos.y && ball.pos.y > pos.y - ball.r) {
      if (ball.pos.x > pos.x && ball.pos.x < pos.x + w) { // Top wall
        ball.pos.y = pos.y - ball.r;
        ball.vel.y *= -1;
      } else if (ball.pos.x < pos.x && ball.pos.x > pos.x - ball.r) { //  Top left corner
        bounceCorner(new PVector(pos.x,pos.y));
      } else if (ball.pos.x > pos.x + w && ball.pos.x < pos.x + w + ball.r) { // Top right corner
        bounceCorner(new PVector(pos.x+w,pos.y));
      }
    } else if (ball.pos.x < pos.x && ball.pos.x > pos.x - ball.r) {
      if (ball.pos.y > pos.y && ball.pos.y < pos.y + h) { // Left wall
        ball.pos.x = pos.x - ball.r;
        ball.vel.x *= -1;
      }
    } else if (ball.pos.x > pos.x + w && ball.pos.x < pos.x + w + ball.r) {
      if (ball.pos.y > pos.y && ball.pos.y < pos.y + h) { // Right wall
        ball.pos.x = pos.x + w + ball.r;
        ball.vel.x *= -1;
      }
    }
  }
  
  void bounceCorner(PVector corner) { // Used in hit() method
    PVector dis = PVector.sub(corner, ball.pos);
    if (dis.mag() < ball.r) {
      float angle = PVector.sub(corner, ball.pos).heading();
      float mag = ball.vel.mag();
      
      ball.vel.x = -mag * cos(angle);
      ball.vel.y = -mag * sin(angle);
      
      ball.pos.x = -ball.r * cos(angle) + corner.x;
      ball.pos.y = -ball.r * sin(angle) + corner.y;
    }
  }
}
