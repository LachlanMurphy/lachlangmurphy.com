// Object to keep track of the snake

class Player {
  // This array will keep track of each part of the snake's body
  ArrayList<Cell> body = new ArrayList<Cell>();
  
  float x,y;
  float momentumX = 1;
  float momentumY = 0;
  int len;
  
  Player(float x_, float y_, int len_) {
    x = x_;
    y = y_;
    len = len_;
    
    // Creates the snakes body
    for (int i = len - 1; i >= 0; i--) {
      body.add(new Cell(i, 5, 255));
    }
  }
  
  // Always step though time!
  void step() {
    for (int i = body.size() - 1; i >= 0; i--) {
      if (i == 0) {
        // Once the function reaches the head it moves it forward relative to the momentum
        body.get(i).x = body.get(i).x + momentumX;
        body.get(i).y = body.get(i).y + momentumY;
      } else {
        // Moves each part of the body to the next
        body.get(i).x = body.get(i-1).x;
        body.get(i).y = body.get(i-1).y;
      }
    }
  }
  
  // Returns the size of the body
  int size() {
    return body.size();
  }
  
  // Returns the specific location of a specific cell in the body
  int[] place(int cell) {
    int[] pos = new int[2];
    pos[0] = (int)body.get(cell).x;
    pos[1] = (int)body.get(cell).y;
    
    return pos;
  }
  
  // Detects if the body is going outside of the borders
  boolean hit() {
    for (int i = 1; i < body.size(); i++) {
      if (body.get(0).x == body.get(i).x && body.get(0).y == body.get(i).y) {
        return true;
      }
    }
    
    if (((body.get(0).x >= 0 && body.get(0).y >= 0) && (body.get(0).x < width/20 && body.get(0).y < height/20))) {
      return false;
    } else {
      return true;
    }
  }
  
  boolean eat(int[] apple) {
    if (body.get(0).x == apple[0] && body.get(0).y == apple[1]) {
      return true;
    } else {
      return false;
    }
  }
  
  void add() {
    body.add(new Cell(body.get(body.size()-1).x, body.get(body.size()-1).x, 255));
  }
}
