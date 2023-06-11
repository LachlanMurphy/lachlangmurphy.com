int count;

void setup() {
  size(1000,700);
  colorMode(HSB);
  
  surface.setResizable(true);
  
  frameRate(1);
  count = 0;
}

void draw() {
  count++;
  drawSet(count);
  //noLoop();
}

void mousePressed() {
  saveFrame();
}

void drawSet(int iterations) {
  int maxiterations = iterations;
  
  for (int i = 0; i < width; i++) {
    for (int j = 0; j < height; j++) {
      float a = map(i,0,width,-2,2);
      float b = map(j,0,height,-2,2);
      
      int n = 0;
      float ca = a;
      float cb = b;
      
      while (n < maxiterations) {
        float aa = (a*a - b*b)*1;
        float bb = 2*a*b;
        
        a = aa + ca;
        b = bb + cb;
        
        if (abs(a+b) > 16) {
          break;
        }
        
        n++;
      }
      
      color col = color(map(n,0,maxiterations,0,255),255,255);
      
      if (n == maxiterations) {
        col = 0;
      }
      
      stroke(col);
      point(i,j);
    }
  }
}
