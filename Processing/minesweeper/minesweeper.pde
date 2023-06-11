ArrayList<ArrayList<Cell>> board; // Two dimensional array to keep track of board

Button[] button = new Button[3];

int cellWidth = 900/20;
int difficulty = 2;
int[] sizeWidth = {8,13,30}; // Scale size of board based on difficulty
int[] sizeHeight = {8,15,16}; // ''
int[] bomb = {10,40,99};
int[] surroundX = {-1,-1,0,1,1,1,0,-1}; // Array to check surrounding cells
int[] surroundY = {0,1,1,1,0,-1,-1,-1}; // ''

boolean gameOn = false;
String message;

float time = 0;
float timer = 0;

void setup() {
  size(1350,950);
  
  textAlign(CENTER,CENTER);
  textSize(32);
  
  instantiateBoard(); // Make a board first to avoid null pointer exceptions
  
  message = "Mine Sweeper!!! :)";
  
  // Add buttons
  button[0] = new Button("Easy",20,height-220,color(10,150,10), 0);
  button[1] = new Button("Medium",20,height-145,color(255,191,0), 1);
  button[2] = new Button("Hard",20,height-70,color(255,0,0), 2);
}

void draw() {
  background(0);
  
  drawBoard();
  
  // Draw bottom menu
  for (Button b: button) {
    b.display();
  }
  text("<=",200,button[difficulty].pos.y+25);
  text(message, width/2,height-100);
  
  if (gameOn) timer = millis()-time;
  text("Time: " + timer/1000,width/2-200,height-100);
}

void mousePressed() {
  // Check if the buttons are clicked
  for (Button b: button) {
    b.click();
  }
  
  // Do nothing if clicked below the board
  if (mouseY > sizeHeight[difficulty]*900/20) 
    return;
  
  // Find which cell the mouse is on
  int x = mouseX/cellWidth;
  int y = mouseY/cellWidth;
  
  // Flag cell
  if (mouseButton == RIGHT && !board.get(x).get(y).reveal) {
    board.get(x).get(y).flag = !board.get(x).get(y).flag;
    return;
  }
  
  // Check if flagged
  if (board.get(x).get(y).flag) 
    return;
  
  if (gameOn) {
    // Check the cells around the one clicked
    checkCell(x,y);
    
  } else {
    // On fist click make the board
    makeBoard();
    
    time = millis();
    
    message = "Don't lose :(";
    
    gameOn = true;
    mousePressed(); // Run the click once the board is made
  }
}

void instantiateBoard() {
  // Makes blank board
  
  board = new ArrayList<>(sizeWidth[difficulty]);
  
  for (int i = 0; i < sizeWidth[difficulty]; i++) {
    board.add(new ArrayList<Cell>(sizeHeight[difficulty]));
    for (int j = 0; j < sizeHeight[difficulty]; j++) {
      board.get(i).add(new Cell(i,j));
    }
  }
}

void makeBoard() {
  instantiateBoard();
  
  // Fills blank board with bombs depending on difficulty
  // and assigns numbers to surrounding cells
  
  // Assign bombs
  for (int i = 0; i != bomb[difficulty];) {
    int x = (int)random(0,sizeWidth[difficulty]);
    int y = (int)random(0,sizeHeight[difficulty]);
    if (board.get(x).get(y).value != -1) { // Avoid repeats
      board.get(x).get(y).value = -1;
      i++;
    }
  }
  
  // Assign values to cells
  for (int i = 0; i < sizeWidth[difficulty]; i++) {
    for (int j = 0; j < sizeHeight[difficulty]; j++) {
      if (board.get(i).get(j).value != -1) { // Make sure the selected cell isn't a bomb 
        for (int k = 0; k < 8; k++) { // Check all the surrounding cells
          if (i+surroundX[k] >= 0 &&
              i+surroundX[k] <= sizeWidth[difficulty]-1 &&
              j+surroundY[k] >= 0 &&
              j+surroundY[k] <= sizeHeight[difficulty]-1) { // Make sure that we check cells that are actually there
            if (board.get(i+surroundX[k]).get(j+surroundY[k]).value == -1) {
              board.get(i).get(j).value++;
            }
          }
        }
      }
    }
  }
  
  // Make sure the first cell clicked is 0
  int x = mouseX/cellWidth;
  int y = mouseY/cellWidth;
  
  // If not try again
  if (board.get(x).get(y).value != 0)
    makeBoard();
}

void checkCell(int x, int y) {
  // Checks the clicked cell
  
  if (board.get(x).get(y).value == 0) { // If the cell is empty recursively check surrounding cells
    for (int i = 0; i < 8; i++) {
      if (x+surroundX[i] >= 0 && 
          x+surroundX[i] <= sizeWidth[difficulty]-1 && 
          y+surroundY[i] >= 0 && 
          y+surroundY[i] <= sizeHeight[difficulty]-1 && 
          (!board.get(x+surroundX[i]).get(y+surroundY[i]).reveal || !board.get(x).get(y).reveal)
         ) { // Check surrounding cells
        board.get(x).get(y).reveal = true;
        checkCell(x+surroundX[i], y+surroundY[i]);
      }
    }
  } else if (board.get(x).get(y).value > 0 && !board.get(x).get(y).flag) { // Reveal cell if the value is > 0
    board.get(x).get(y).reveal = true;
  } else if (board.get(x).get(y).value < 0) { // If the cell is a bomb end the game
    gameOn = false;
    message = "You suck Poopoo";
  }
  
}

void drawBoard() {
  // Draws everything to the board in order of appearance
  
  for (int i = 0; i < board.size(); i++) {
    for (int j = 0; j < board.get(i).size(); j++) {
      // Cell's border
      stroke(255);
      fill(0);
      rect(i*cellWidth,j*cellWidth,cellWidth,cellWidth);
      
      // Cell's value if it's not 0
      fill(255);
      if (board.get(i).get(j).value != 0) 
        text(board.get(i).get(j).value,i*cellWidth+cellWidth/2,j*cellWidth+cellWidth/2);
      
      // Cell's cover if it's not yet revealed
      if (!board.get(i).get(j).reveal) {
        stroke(0);
        fill(255);
        rect(i*cellWidth,j*cellWidth,cellWidth,cellWidth);
      }
      
      // Flag if there is one
      if (board.get(i).get(j).flag) {
        fill(255,0,0);
        text("F",i*cellWidth+cellWidth/2,j*cellWidth+cellWidth/2);
      }
      
      // Show all the bombs once the game ends
      if (!gameOn && board.get(i).get(j).value == -1) {
        fill(0);
        circle(i*cellWidth+cellWidth/2,j*cellWidth+cellWidth/2,30);
      }
    }
  }
}
