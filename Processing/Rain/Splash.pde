class Splash {
  float x;
  ArrayList<SplashDrop> drops;
  int lifeTime;
  Drop d;
  
  Splash(Drop d) {
    this.x = d.pos.x;
    lifeTime = 60;
    
    this.d = d;
    
    drops = new ArrayList<SplashDrop>();
    for (int i = 0; i < (int)random(2,4); i++)
      drops.add(new SplashDrop(this));
  }
  
  void display() {
    lifeTime--;
    
    for (int i = drops.size()-1; i >= 0; i--)
      drops.get(i).display();
  }
}
