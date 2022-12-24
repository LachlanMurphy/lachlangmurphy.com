let player;

let keys = [];

let rocks;

let score;

let screenId;

function startGame() {
	player = new Player(width/2,height/2);
	score = 0;
	screenId = 2;
	textSize(30);
	rocks = [];
	textAlign(CENTER,TOP);
}

function setup() {
	createCanvas(500,500);
	background(0);

	startGame();

	screenId = 1;
	textSize(40)
}

function draw() {
	switch(screenId) {
	case 1:
		drawMenu();
		break;
	case 2:
		drawGame();
		break;
	case 3:
		drawGameEnd();
		break;
	}
}

function drawGameEnd() {
	textSize(40);
	textAlign(CENTER,CENTER);
	textAlign(CENTER,BOTTOM);
	text("Game Over", width/2,height/2);
	textAlign(CENTER,TOP);
	text("Space to Play Again", width/2,height/2);
}

function drawMenu() {
	background(0);
	fill(255);
	textAlign(CENTER,BOTTOM);
	text("Asteroids", width/2,height/2);
	textAlign(CENTER,TOP);
	text("Space to Play", width/2,height/2);
}

function drawGame() {
	background(0);

	// Draw HUD
	fill(255);
	text("Score: " + score,width/2,15);

	if (random(1) < 0.01)
		rocks.push(new Rock());

	for (let i = 0; i < rocks.length; i++) {
		let r = rocks[i];
		r.display();

		if (r.count > 800)
			rocks.splice(rocks.indexOf(r), 1);

		if (p5.Vector.sub(r.pos,player.pos).mag() < 10/* Radius of hitbox 1 */+r.r
			|| p5.Vector.sub(r.pos,p5.Vector.add(player.pos,createVector(20*cos(player.heading),20*sin(player.heading)))).mag() < 5/* Radius of hitbox 2*/+r.r) {
			screenId = 3;
		}
	}

	player.step();
	player.drag();
	player.edges();
	player.display();

	let addRocks = [];
	let removeRocks = [];
	for (let i = player.bullets.length-1; i >= 0; i--) {
		let b = player.bullets[i];
		for (let j = rocks.length-1; j >= 0; j--) {
			let r = rocks[j];
			if (dist(b.pos.x,b.pos.y,r.pos.x,r.pos.y) < r.r+b.r) {
				player.bullets.splice(player.bullets.indexOf(b), 1);

				if (r.r === 50) {
					addRocks.push(r);
					addRocks.push(r);
					score += 100;
				} else {
					score += 400;
				}
				removeRocks.push(r);
				break;
			} 
		}

		b.display();
		b.edges();
		if (b.count > 40) {
			player.bullets.splice(player.bullets.indexOf(b), 1);
		}
	}

	for (const r of addRocks) {
		rocks.push(new SmallRock(r));
	}
	for (const r of removeRocks) {
		rocks.splice(rocks.indexOf(r), 1);
	}

	if (keys.includes("w")) {
		let boost = createVector(cos(player.heading),sin(player.heading));
		player.vel.add(boost.setMag(0.5));
	}
	if (keys.includes("a"))
		player.heading -= 0.1;
	if (keys.includes("d"))
		player.heading += 0.1;
}

function keyPressed() {
	if (!keys.includes(key)) {
		keys.push(key);
	}

	if (key === " " && player.bullets.length < 4 && screenId === 2) {
		player.bullets.push(new Bullet(player))
	} else if (screenId === 1 || screenId === 3) {
		startGame();
	}
}

function keyReleased() {
	keys.splice(keys.indexOf(key), 1);
}

class Player {
	constructor(x,y) {
		this.pos = createVector(x,y);
		this.vel = createVector(0,0);
		this.acc = createVector(0,0);
		this.heading = 0;


		// Hit detection
		this.hit1 = this.pos; // Radius of 10
		this.hit2 = createVector(20*cos(this.heading),20*sin(this.heading)); // Radius of 5

		this.bullets = [];
	}

	step() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
	}

	display() {

		push();
		translate(this.pos.x,this.pos.y);
		rotate(this.heading);

		stroke(255);
		strokeWeight(2);
		noFill();
		beginShape();
		vertex(30,0);
		vertex(15*cos(3*PI/4),15*sin(3*PI/4));
		vertex(15*cos(-3*PI/4),15*sin(-3*PI/4));
		endShape(CLOSE);
		pop();
	}

	edges() {
		if (this.pos.x > width+50) {
			this.pos.x = 0-50;
		}
		if (this.pos.x < 0-50) {
			this.pos.x = width+50;
		}
		if (this.pos.y > height+50) {
			this.pos.y = 0-50;
		}
		if (this.pos.y < 0-50) {
			this.pos.y = height+50;
		}
	}

	drag() {
		this.vel.mult(0.97);
	}
}

class Bullet {
	constructor(parent) {
		this.pos = createVector(parent.pos.x+30*cos(parent.heading),parent.pos.y+30*sin(parent.heading));
		this.vel = createVector(10*cos(parent.heading),10*sin(parent.heading));
		this.count = 0;
		this.r = 5/2;
	}

	display() {
		this.pos.add(this.vel);
		this.count++;

		noStroke()
		fill(255);
		circle(this.pos.x,this.pos.y,this.r*2);
	}

	edges() {
		if (this.pos.x > width+10) {
			this.pos.x = 0-10;
		}
		if (this.pos.x < 0-10) {
			this.pos.x = width+10;
		}
		if (this.pos.y > height+10) {
			this.pos.y = 0-10;
		}
		if (this.pos.y < 0-10) {
			this.pos.y = height+10;
		}
	}
}

class Rock {
	constructor() {
		this.r = 50;
		this.count  = 0;
		if (random(1) < 0.5)
			this.rotation = 1;
		else
			this.rotation = -1;

		let theta;
		let speed = 1;
		switch(Math.floor(random(1,5))) {
			case 1:  // Top
				this.pos = createVector(width/2,-100);
				theta = random(PI/3,2*PI/3);
				this.vel = createVector(speed*cos(theta), speed*sin(theta));
				break;
			case 2:  // Right
				this.pos = createVector(width+100,height/2);
				theta = random(2*PI/3,4*PI/3);
				this.vel = createVector(speed*cos(theta), speed*sin(theta));
				break;
			case 3:  // Bottom
				this.pos = createVector(width/2,height+100);
				theta = random(-2*PI/3,-PI/3);
				this.vel = createVector(speed*cos(theta), speed*sin(theta));
				break;
			case 4:  // Left
				this.pos = createVector(-100,height/2);
				theta = random(-PI/3,PI/3);
				this.vel = createVector(speed*cos(theta), speed*sin(theta));
				break;
		}

		this.points = [];
		for (let i = 0; i < TAU; i += 0.75) {
			let newR = this.r+random(-10,10);
			this.points.push({
				x: newR*cos(i),
				y: newR*sin(i)
			});
		}
	}

	display() {
		this.pos.add(this.vel);
		this.count++;

		push();
		translate(this.pos.x,this.pos.y);
		rotate(this.rotation*frameCount/92);

		noFill();
		stroke(255);
		beginShape();
		for (let i = 0; i < this.points.length; i++) {
			vertex(this.points[i].x,this.points[i].y);
		}
		endShape(CLOSE);
		pop();
	}
}

class SmallRock extends Rock {
	constructor(parent) {
		super();
		this.r = 20;
		this.count = 0;
		this.rotation = parent.rotation;
		this.pos = parent.pos.copy();
		let h = parent.vel.heading();
		let r = parent.vel.mag();
		let dTheta = random(-PI,PI);
		this.vel = createVector(r*cos(h+dTheta), r*sin(h+dTheta));

		this.points = [];
		for (let i = 0; i < TAU; i += 0.75) {
			let newR = this.r+random(-10,10);
			this.points.push({
				x: newR*cos(i),
				y: newR*sin(i)
			});
		}
	}
}