ArrayList<Circle> circles;
ArrayList<PVector> shape;

void setup() {
  size(500,500);
  
  circles = new ArrayList<>();
  
  //for (int i = 0; i < 10; i++) {
  //  circles.add(new Circle(0,0, (10-i)*5, i * 0.023 + 0.023));
  //}
  
  circles.add(new Circle(0,0,50,0.01));
  circles.add(new Circle(0,0,45,0.001));
  circles.add(new Circle(0,0,30,0.04));
  circles.add(new Circle(0,0,25,0.01));
  circles.add(new Circle(0,0,20,0.005));
  circles.add(new Circle(0,0,15,0.1));
  circles.add(new Circle(0,0,10,0.2));
  
  shape = new ArrayList<>();
}

void draw() {
  background(0);
  
  push();
  translate(width/2,height/2);
  
  for (int i = 0; i < circles.size(); i++) {
    if (i == 0) {
      circles.get(i).display();
    } else {
      float r = circles.get(i-1).r;
      float a = circles.get(i-1).a;
      float x = circles.get(i-1).pos.x;
      float y = circles.get(i-1).pos.y;
      circles.get(i).pos.set(x + r*cos(a), y + r*sin(a));
      circles.get(i).display();
      
      if (i == circles.size()-1) {
        float r_ = circles.get(i).r;
        float a_ = circles.get(i).a;
        float x_ = circles.get(i).pos.x;
        float y_ = circles.get(i).pos.y;
        shape.add(new PVector(x_ + r_*cos(a_), y_ + r_*sin(a_)));
      }
    }
  }
  
  noFill();
  stroke(255,0,0);
  beginShape();
  for (PVector p: shape) {
    vertex(p.x,p.y);
  }
  endShape();
  
  pop();
}
