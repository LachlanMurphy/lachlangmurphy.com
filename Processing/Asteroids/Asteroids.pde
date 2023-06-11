// Initialize variables
Ship ship;
float rockRate;
int score;

// Initialize arrays
ArrayList<Rock> rock = new ArrayList<Rock>();
ArrayList<Bullet> bullet = new ArrayList<Bullet>();
ArrayList<String> keys = new ArrayList<String>();

void setup() {
  size(1000, 700);
  frameRate(30);
  
  // Initial variable size
  rockRate = 2;
  score = 0;
  
  // Create initial objects
  ship = new Ship(width/2, height/2);
}

void draw() {
  // Refresh the background every frame
  background(0);
  
  // Display the score
  textSize(32);
  text("Score: " + score, 10, 32);
  
  /*
   * Methods to run when a button is pressed or being pressed
   * Bullet shooting not included so it can be capped out
   */
  if (keys.contains(Integer.toString(38))) {
    ship.boost();
    ship.drawBoost();
  }
  if (keys.contains(Integer.toString(37))) {
    ship.theta = ship.theta - (float)Math.PI/12;
  }
  if (keys.contains(Integer.toString(39))) {
    ship.theta = ship.theta + (float)Math.PI/12;
  }
  
  /*
   * All stuff for the ship
   */
  
  // Display the ship
  ship.display();
  
  // Move ship
  ship.center[0] = ship.mX + ship.center[0];
  ship.center[1] = ship.mY + ship.center[1];
  
  // Natural drag of the ship
  if (ship.mX > 0) {
    ship.mX = ship.mX - 0.1;
  } else if (ship.mX < 0) {
    ship.mX = ship.mX + 0.1;
  }
  if (ship.mY > 0) {
    ship.mY = ship.mY - 0.1;
  } else if (ship.mY < 0) {
    ship.mY = ship.mY + 0.1;
  }
  
  // Make the ship move through the walls
  if (ship.center[0] > width) {
    ship.center[0] = 0;
  } else if (ship.center[0] < 0) {
    ship.center[0] = width;
  }
  if (ship.center[1] > height) {
    ship.center[1] = 0;
  } else if (ship.center[1] < 0) {
    ship.center[1] = height;
  }
  
  /*
   * All stuff with the bullets
   */
   
   // Display bullet
  for (Bullet b: bullet) {
    b.step();
    b.display();
  }
  
  // Checks if bullets hits a rock if so delete both
  for (int i = 0; i < bullet.size(); i++) {
    for (int j = 0; j < rock.size(); j++) {
      if (bullet.get(i).collide(rock.get(j))) {
        if (rock.get(j).size == 50) {
          rock.add(new Rock(25, rock.get(j)));
          rock.add(new Rock(25, rock.get(j)));
          score = score + 20; // Score distribution
        } else if (rock.get(j).size == 25) {
          rock.add(new Rock(15, rock.get(j)));
          rock.add(new Rock(15, rock.get(j)));
          score = score + 50; // Score disrtibution
        } else if (rock.get(j).size == 15) {
          score = score + 100; // Score distribution
        }
        
        rock.remove(rock.get(j)); // Always deletes the rock
        rockRate = rockRate + 0.1; // Increase rate of rock spawning when a rock is hit.
        
        bullet.get(i).collide = true; // Iterators won't let me delet the bullet inside this loop, so we do it outside this loop
      }
    }
    // Delete bullet
    if (bullet.get(i).collide == true) {
      bullet.remove(bullet.get(i));
    }
  }
  
  // Delete bullets when they go a distence
  for (int i = 0; i < bullet.size(); i++) {
    if (bullet.get(i).mag > 500) {
      bullet.remove(bullet.get(i));
    }
  }
   
   // Move bullets when out of bounds
  for (int i = 0; i < bullet.size(); i++) {
    if (bullet.get(i).x > width) {
      bullet.get(i).x = 0;
    }
    if (bullet.get(i).x < 0) {
      bullet.get(i).x = width;
    }
    
    if (bullet.get(i).y > height) {
      bullet.get(i).y = 0;
    }
    if (bullet.get(i).y < 0) {
      bullet.get(i).y = height;
    }
  }
  
  /*
   * All stuff with the rocks
   */
   
  // Create rocks based on levels and stuff
  if (random(1,100) <= rockRate) {
    if (rockRate < 100) {
      rockRate = rockRate + 0.05;
    }
    rock.add(new Rock(50));
  }
  
  // Displays all the rocks
  for (Rock r: rock) {
    r.step();
    r.display();
  }
  
  // Delete asteroids when out of bounds
  for (int i = rock.size() - 1; i >= 0; i--) {
    if (!(rock.get(i).pos.x > 0 && rock.get(i).pos.x < width && rock.get(i).pos.y > 0 && rock.get(i).pos.y < height || rock.get(i).start == true)) {
      rock.remove(rock.get(i));
    }
  }
  
  // Check if an asteroid hits the ship
  for (int i = 0; i < rock.size(); i++) {
    if ((dist(rock.get(i).pos.x,rock.get(i).pos.y,ship.center[0],ship.center[1]) < rock.get(i).size/2 + 19)
    || (dist(rock.get(i).pos.x,rock.get(i).pos.y,ship.center[0]+20*cos(ship.theta),ship.center[1]+20*sin(ship.theta)) < rock.get(i).size/2 + 13)) {
      background(255,0,0);
      String scoreString = "Score: " + score;
      text("Score: " + score, width/2 - scoreString.length()*10, height/2);
      noLoop();
    }
  }
}

void keyPressed() {
  // When space pressed shoot, capped out at 4
  if (keyCode == 32 && !keys.contains(Integer.toString(keyCode)) && bullet.size() < 4) {
    bullet.add(new Bullet(ship));
  }
  
  // When a key is presseed push to key array 
  if (!keys.contains(Integer.toString(keyCode))) {
    keys.add(Integer.toString(keyCode));
  }
}

void keyReleased() {
  // When a key is released, remove from key array
  keys.remove(Integer.toString(keyCode));
}
