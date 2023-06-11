class Tree {
  PVector pos;
  float dTheta;
  color col;
  
  Tree(float x, float y, color col) {
    pos = new PVector(x,y);
    dTheta = PI/6;
    this.col = col;
  }
  
  void display(float theta) {
    stroke(col);
    int count = 0;
    float len = 100;
    makeBranch(pos.x,pos.y, len, theta, count);
  }
  
  void makeBranch(float x, float y, float len, float theta, int count) {
    line(x,y,len*cos(theta)+x,len*sin(theta)+y);
    theta += dTheta;
    count++;
    len -= 10;
    if (count < 10) {
      makeBranch((len+10)*cos(theta-dTheta)+x,(len+10)*sin(theta-dTheta)+y, len, theta, count);
      makeBranch((len+10)*cos(theta-dTheta)+x,(len+10)*sin(theta-dTheta)+y, len, theta-2*dTheta, count);
    }
      
    
  }
}
