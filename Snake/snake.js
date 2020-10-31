let canvas = document.getElementById('gameBoard');
let context = canvas.getContext('2d');

context.scale(20, 20);

const arena = createMatrix(25, 25);

var momentum = {
	x: 1,
	y: 0
}

class snakeClass {
	constructor(x, y, value) {
		this.pos = {
			x: x,
			y: y,
		}
		this.value = value;
	}
}

var snake = [];

for (var i = 0; i < 7; i++) {
	snake.push(new snakeClass(7 - i, 1, i + 1));
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function drawArena() {
	arena.forEach((row, x) => {
		row.forEach((value, y) => {
			if (value > 0) {
				context.fillStyle = 'white';
			} else {
				context.fillStyle = 'rgb(55, 55, 55)'
			}
			context.fillRect(x, y, 1, 1);
			if (value > 0) {
				context.fillStyle = 'red';
				context.fillRect(x + 0.05, y + 0.05, 0.9, 0.9);
			}
		});
	});
}

function update() {
	
	for (var i = 0; i < snake.length; i++) {
		let snakethis = snake[snake.length - 1 - i];
		if ((snake[0].pos.x < 24 || momentum.x === -1 || momentum.y !== 0) && (snake[0].pos.y < 24 || momentum.y === -1 || momentum.x !== 0) && (snake[0].pos.x > 0 || momentum.x === 1 || momentum.y !== 0) && (snake[0].pos.y > 0 || momentum.y === 1 || momentum.x !== 0)) {
			if (i === 0) {
				arena[snakethis.pos.x][snakethis.pos.y] = 0;
			}
			if (snakethis.value !== 1) {
				snakethis.pos.x = snake[snake.length - 2 - i].pos.x;
				snakethis.pos.y = snake[snake.length - 2 - i].pos.y;
			} else {
				snakethis.pos.x += momentum.x;
				snakethis.pos.y += momentum.y;
			}
			arena[snakethis.pos.x][snakethis.pos.y] = snakethis.value;
		}
	}
	drawArena();
}

window.setInterval(function() {
	update();
}, 150);

document.onkeydown = function(event) {
	if (event.key == 'w' && momentum.y !== 1) {
		momentum.y = -1;
		momentum.x = 0;
	} else if (event.key == 's' && momentum.y !== -1) {
		momentum.y = 1
		momentum.x = 0;
	} else if (event.key == 'd' && momentum.x !== -1) {
		momentum.y = 0;
		momentum.x = 1;
	} else if (event.key == 'a' && momentum.x !== 1) {
		momentum.y = 0;
		momentum.x = -1;
	}
}