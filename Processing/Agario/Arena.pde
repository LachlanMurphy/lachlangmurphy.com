class Arena {
  float w,h;
  
  Arena(float w, float h) {
    this.w = w;
    this.h = h;
  }
  
  void display() {
    stroke(0);
    strokeWeight(4);
    for (int i = 0; i < w/100; i++) {
      line(i*100,0,i*100,h);
    }
    
    for (int i = 0; i < h/100; i++) {
      line(0,i*100,w,i*100);
    }
    line(0,h,w,h);
    line(w,0,w,h);
  }
}
