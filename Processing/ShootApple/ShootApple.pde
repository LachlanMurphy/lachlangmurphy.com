Bow bow;
int step = 20;

ArrayList<Arrow> arrow = new ArrayList<Arrow>();
ArrayList<Apple> apple = new ArrayList<Apple>();
PVector[] ground = new PVector[step];
PVector shootArea = new PVector(0,0);

String[] phrase = {"You suck", "Be better", "You lose", "The apple shot you?", "Eat it", "Your score is lower than my IQ", "Your mom", "Use your brain next time",
                   "Are you color blind?", "Im bad with gramar", "3.14156", "Nice shot", "| || || |_", "Apples consume you", "u suck butt poopy pants", 
                   "I am your daddy", "I love you Lachlan", "square root me"};

int time = 600;
int screenID = 0;
int frameOffset;

void setup() {
  size(1500,900);
  frameRate(60);
  
  apple.add(new Apple(width/2,height/2));
  
  for (int i = ground.length-1; i >= 0; i--) {
    ground[i] = new PVector(i*width/step, 50*sin((i*width/step)/(PI*50))+height-300);
  }
  
  shootArea.set(random(20,width-100),random(100,height-400));
}

void draw() {
  if (screenID == 0) {
    drawHome();
  }
  if (screenID == 1) {
    drawGame();
  }
}

void drawHome() {
  background(0);
  
  fill(255);
  rect(width/2-100,height/2-50,200,100);
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(0);
  text("Start",width/2,height/2);
  
  if (mousePressed && mouseX > width/2-100 && mouseX < width/2+100 && mouseY > height/2-50 && mouseY < height/2+50) {
    screenID = 1;
    frameOffset = frameCount;
  }
}

void drawGame() {
  background(0,181,226);
  
  for (Apple a: apple) {
    a.display();
  }
  
  // Make shoot box
  noStroke();
  if (bow != null) {
    stroke(0);
    strokeWeight(4);
  }
  fill(0,0,0,90);
  rect(shootArea.x,shootArea.y, 200, 100);
  
  // Make the ground
  fill(0,150,0);
  noStroke();
  beginShape();
  for (int i = 0; i < ground.length; i++) {
    vertex(ground[i].x,ground[i].y);
  }
  vertex(width, 50*sin(width/(PI*50))+height-300);
  vertex(width,height);
  vertex(0,height);
  endShape();
  
  // arrow collision checking
  for (Arrow a: arrow) {
    if (a.hit == false) {
      for (int i = 1; i < ground.length; i++) {
        a.checkGround(ground[i-1], ground[i]);
      }
    }
  }
  
  for (int i = apple.size()-1; i >= 0; i--) {
    for (int j = arrow.size()-1; j >= 0; j--) {
      if (arrow.get(j).checkApple(apple.get(i))) {
        apple.get(i).move();
        arrow.remove(arrow.get(j));
        shootArea.set(random(20,width-100),random(100,height-400));
        time += 120;
      }
    }
  }
  
  if (mousePressed && bow != null) {
    bow.display();
  }
  
  for (int i = arrow.size()-1; i >= 0; i--) {
    arrow.get(i).show();
    if (arrow.get(i).tail.x > width || arrow.get(i).tail.x < 0 || arrow.get(i).tail.y > height) {
      arrow.remove(arrow.get(i));
    }
  }
  
  textSize(100);
  textAlign(LEFT,TOP);
  fill(0);
  text(map(time,0,600,0,10),20,20);
  time--;
  textAlign(RIGHT,TOP);
  text("Score: " + (frameCount-frameOffset), width-20,20);
  
  if (time <= 0) {
    background(0,255,0);
    textAlign(CENTER,CENTER);
    text(phrase[int(random(0,phrase.length-1))], width/2,height/2);
    textAlign(CENTER,TOP);
    text("Score: " + (frameCount-frameOffset), width/2,height/2+30);
    noLoop();
  }
}

void mousePressed() {
  if (mouseX < shootArea.x+200 && mouseX > shootArea.x && mouseY < shootArea.y + 100 && mouseY > shootArea.y) {
    bow = new Bow(mouseX, mouseY);
  }
}

void mouseReleased() {
  if (bow != null && bow.pwr.mag() != 0) {
    arrow.add(new Arrow(bow));
    bow = null;
  }
}
