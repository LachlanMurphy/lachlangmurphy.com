class Player extends Particle{
  Player(float x, float y, float r, String name) {
    super(x,y,r);
    id = name;
  }
  
  void eat(ArrayList<Particle> enemies) {
    for (int i = enemies.size()-1; i >= 0; i--) {
      if (PVector.sub(enemies.get(i).pos,pos).mag() < r && enemies.get(i).r/r < 0.9) {
        r += enemies.get(i).r * 0.1;
        enemies.remove(enemies.get(i));
        enemies.add(new Enemy(random(40,arena.w-40),random(40,arena.h-40), random(20,75)));
      }
    }
  }
}
