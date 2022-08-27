let context = document.getElementById('gameField').getContext('2d');

context.scale(5, 5);

const figures = [
	[
		[0, 0, 1, 0, 0],
		[0, 1, 1, 1, 0],
		[0, 1, 1, 1, 0],
		[1, 1, 0, 1, 1],
		[1, 1, 0, 1, 1],
	],
	[
		[0, 0, 1, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 1, 0, 0],
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
	pos: {x: 0, y: 90},
	matrix: figures[0],

}

var bullet = {
	pos: {x: 0, y: 87},
	matrix: figures[1],
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
	if (event.keyCode === 39) {
		if (spaceShip.pos.x < 94) {
			spaceShip.pos.x = spaceShip.pos.x + 2;
			bullet.pos.x = bullet.pos.x + 2;
		}
	} if (event.keyCode === 37) {
		if (spaceShip.pos.x > 0) {
			spaceShip.pos.x = spaceShip.pos.x - 2;
			bullet.pos.x = bullet.pos.x - 2;
		}
	} if (event.keyCode === 32) {
		var bulletX = spaceShip.pos.x;
		var bulletY = 90;
		
		for (var i = 0; i <= 90; i++) {
			var x = setTimeout(function () {
				if (bulletY > 0) {
					bulletY--;
					arena[bulletY][bulletX] = 1;
					arena[bulletY + 1][bulletX] = 0;
				} else {
					console.log(bulletY)
					arena[0][bulletX] = 0;
				}
				update();
			}, 5 * i);
		}
		
	}
	update();
}

function bulletUpdate() {
	insert(bullet.matrix, bullet.pos);
	drawArena();
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

