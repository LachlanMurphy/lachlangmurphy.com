class Maze {
   ArrayList<Wall> walls;
   Integer[][] grid;
   int cellWidth;
   
   PVector goal;
   
   Maze(Integer[][] grid, int w) {
     cellWidth = w;
     walls = new ArrayList<>();
     this.grid = grid;
     
     for (int i = 0; i < grid.length; i++) {
       for (int j = 0; j < grid[i].length; j++) {
         switch(grid[i][j]) {
           case -1:
             walls.add(new Wall(i*cellWidth,j*cellWidth,cellWidth,cellWidth));
           break;
           case -2:
             goal = new PVector(i,j);
         }
       }
     }
   }
   
   void display() {
     for (Wall w: walls) {
       w.display();
     }
     
     fill(0,255,0);
     rect(goal.x*cellWidth,goal.y*cellWidth,cellWidth,cellWidth);
   }
   
   int getScore(PVector ball) {
     return grid[(int)ball.x / cellWidth][(int)ball.y / cellWidth];
   }
}
