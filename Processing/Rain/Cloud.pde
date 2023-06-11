class Cloud {
  PVector pos;
  
  ArrayList<Drop> drops = new ArrayList<Drop>();
  
  float w;
  float[] x = {0,-50,50,-25,25,37.5,-37.5,0};
  float[] y = {0,0,0,0,0,-20,-20,-30};
  
  boolean click = false;
  
  Cloud(float x, float y, float w) {
    pos = new PVector(x,y);
    this.w = w;
  }
  
  void display() {
    // Make/draw rain
    drops.add(new Drop(this));
    
    for (int i = drops.size()-1; i >= 0; i--) {
      drops.get(i).display();
      
      if (drops.get(i).pos.y >= height) {
        splash.add(new Splash(drops.get(i)));
        drops.remove(drops.get(i));
      }
    }
    
    // Click the cloud
    fill(255);
    noStroke();
    if (click) {
      pos.x = mouseX;
      pos.y = mouseY;
    }
    
    // Draw the cloud
    for (int i = 0; i < 8; i++)
      circle(pos.x+x[i]*w,pos.y+y[i]*w,50*w);
  }
  
  boolean contains(float X, float Y) {
    for (int i = 0; i < 8; i++) {
      if (dist(X,Y,pos.x+x[i],pos.y+y[i]) <= 50) {
        return true;
      }
    }
    return false;
  }
}
