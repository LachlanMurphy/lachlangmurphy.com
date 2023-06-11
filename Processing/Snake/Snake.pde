// Variables to keep track of objects
Player player;

// Arrays to keep track of Arrays
ArrayList<ArrayList<Integer>> board = new ArrayList<>((width/20));

// Variables to keep track of variables
int[] apple = new int[2];

// keycheck variable to make sure rapidly pressed keys 
// don't make the snake go over itself
boolean keyCheck = false;

void setup() {
  size(800, 500);
  frameRate(10);
  
  // Create objects
  player = new Player(0, 0, 5);
  
  // Create game board using a 2d array
  for (int i = 0; i < (width/20); i++) {
    board.add(new ArrayList());
  }
  
  for (int i = 0; i < board.size(); i++) {
    for (int j = 0; j < (height/20); j++) {
      board.get(i).add(0);
    }
  }
  
  // Random apple location
  apple[0] = (int)random(0, width/20);
  apple[1] = (int)random(0, height/20);
  
  
}

void draw() {
  background(0);
  
  // Always step through time!
  player.step();
  
  // Checks if player hit something, if so game ends
  if (!player.hit()) {
    System.out.println();
    update();
    display();
  } else {
    background(255, 0, 0);
    noLoop();
  }
  
  if (player.eat(apple)) {
    apple[0] = (int)random(0, width/20);
    apple[1] = (int)random(0, height/20);
    
    player.add();
  }
  
  keyCheck = false;
  //noLoop();
}

void keyPressed() {
  // Checks to see which key was pressed. Changes "momentum" based on key pressed
  if (!keyCheck) {
    if (keyCode == 39 && player.momentumX != -1) {
      player.momentumX = 1;
      player.momentumY = 0;
    } else if (keyCode == 37 && player.momentumX != 1) {
      player.momentumX = -1;
      player.momentumY = 0;
    } else if (keyCode == 40 && player.momentumY != -1) {
      player.momentumX = 0;
      player.momentumY = 1;
    } else if (keyCode == 38 && player.momentumY != 1) {
      player.momentumX = 0;
      player.momentumY = -1;
    }
  }
  keyCheck = true;
}

void update() {
  // Reset the board to all blank
  for (int i = 0; i < board.size(); i++) {
    for (int j = 0; j < board.get(i).size(); j++) {
      board.get(i).set(j, 0);
    }
  }
  
  // Tells the bored where the apple is
  board.get(apple[0]).set(apple[1], 2);
  
  // Tells the board where the snake is
  for (int i = 0; i < player.size(); i++) {
    int[] pos = player.place(i);
    board.get(pos[0]).set(pos[1], 1);
  }
  
}

void display() {
  // Displays the game board
  for (int i = 0; i < board.size(); i++) {
    for (int j = 0; j < board.get(i).size(); j++) {
      if (board.get(i).get(j) == 2) {
        // Fills apple cell
        fill(255, 0, 0);
        rect(i*20, j*20, 18, 18);
      } else if (board.get(i).get(j) == 1) {
        // Fills snake cells
        fill(255);
        rect(i*20, j*20, 18, 18);
      }
    }
  }
}
