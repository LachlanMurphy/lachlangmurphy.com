let canvas = document.getElementById('gameBoard');
let context = canvas.getContext('2d');

context.scale(20, 20);

context.fillStyle = 'white';

const arena = createMatrix(25, 25);

const snake = [
	[1]
]

const player = {
	pos: {x: 1, y: 1},
}

var momentum = {
	x: 1,
	y: 0
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
		});
	});
}

function update() {
	arena[player.pos.x][player.pos.y] = 0;
	if ((player.pos.x < 24 || momentum.x === -1 || momentum.y !== 0) && (player.pos.y < 24 || momentum.y === -1 || momentum.x !== 0) && (player.pos.x > 0 || momentum.x === 1 || momentum.y !== 0) && (player.pos.y > 0 || momentum.y === 1 || momentum.x !== 0)) {
		player.pos.x += momentum.x;
		player.pos.y += momentum.y;
	}
	arena[player.pos.x][player.pos.y] = 1;
	drawArena();
}

window.setInterval(function() {
	update();
}, 200);

document.onkeydown = function(event) {
	if (event.key == 'w') {
		momentum.y = -1;
		momentum.x = 0;
	} else if (event.key == 's') {
		momentum.y = 1
		momentum.x = 0;
	} else if (event.key == 'd') {
		momentum.y = 0;
		momentum.x = 1;
	} else if (event.key == 'a') {
		momentum.y = 0;
		momentum.x = -1;
	}
}