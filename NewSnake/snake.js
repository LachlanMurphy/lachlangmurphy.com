function preventDefault(e) {
  e.preventDefault();
}

let canvas = document.getElementById('gameBoard');
let context = canvas.getContext('2d');
context.scale(20, 20);

var frameRate = 10;

class block {
	constructor(x, y,color) {
		this.pos = {
			x: x,
			y: y
		}

		this.fillColor = color;
	}

	display() {
		context.fillStyle = "white";
		context.fillRect(this.pos.x,this.pos.y,1,1);
		context.fillStyle = this.fillColor;
		context.fillRect(this.pos.x+0.1,this.pos.y+0.1,0.80,0.80);
	}
}

var snake = [];
for ()

var draw = setInterval(function() {
	context.fillStyle = "rgb(55, 55, 55)";
	context.fillRect(0,0,100,20);
	snake[0].display();
}, 1000*1/frameRate);

document.onkeydown = function(event) {
	if (event.keyCode === 87) {
		snake[0].pos.y--;
	}
	if (event.keyCode === 83) {
		snake[0].pos.y++;
	}
	if (event.keyCode === 68) {
		snake[0].pos.x++;
	}
	if (event.keyCode === 65) {
		snake[0].pos.x--;
	}
}