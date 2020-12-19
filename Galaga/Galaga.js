let context = document.getElementById('gameField').getContext('2d');

context.scale(5, 5);

const figures = [
	[
		[0, 0, 1, 0, 0],
		[0, 1, 1, 1, 0],
		[0, 1, 1, 1, 0],
		[1, 1, 0, 1, 1],
		[1, 1, 0, 1, 1],
	]
]

function createMatrix(w, h) {
	const matrix = [];
	while (h--) {
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

var arena = createMatrix(100, 100);

const spaceShip = {
	pos: {x: 1, y: 1},
	matrix: figures[0],

}

function insert(matrix, offset) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value === 1) {
				arena[y + offset.y][x + offset.x] = 1;
			}
		});
	});
}

insert(spaceShip.matrix, spaceShip.pos);

function drawArena() {
	arena.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value === 1) {
				context.fillStyle = 'white';
			} else if (value === 0) {
				context.fillStyle = 'grey';
			}
			context.fillRect(x, y, 1, 1);
		});
	});
}

function arenaClear() {
	arena.forEach((row, y) => {
		row.forEach((value, x) => {
			context.fillStyle = 'grey';
			context.fillRect(x, y, 1, 1);
			arena[y][x] = 0;
		});
	});
}

drawArena();

document.onkeydown = function(event) {
	shipClear();
	if (event.keyCode === 38) {
		spaceShip.pos.y--;
	} if (event.keyCode === 39) {
		spaceShip.pos.x++;
	} if (event.keyCode === 40) {
		spaceShip.pos.y++;
	} if (event.keyCode === 37) {
		spaceShip.pos.x--;
	}
	update();
}

function update() {
	insert(spaceShip.matrix, spaceShip.pos);
	drawArena();
}

function shipClear() {
	for (var i = 0; i < 5; i++) {
		for (var t = 0; t < 5; t++) {
			arena[i + spaceShip.pos.y][t + spaceShip.pos.x] = 0;
		}
	}
}

function shipInsert() {
	for (var i = 0; i < 5; i++) {
		for (var t = 0; t < 5; t++) {
			if (figures[0][i][t] === 1) {
				arena[i + spaceShip.pos.x][t + spaceShip.pos.y] = 1;
			}
		}
	}
}

update();

