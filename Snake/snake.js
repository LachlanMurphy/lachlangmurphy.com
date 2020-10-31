let canvas = document.getElementById('gameBoard');
let context = canvas.getContext('2d');
context.scale(20, 20);
var gameOn = false;

document.getElementById('play').onmousedown = function() {
	if (gameOn === false) {
		gameOn = true;
		document.getElementById('message').innerText ='Snake';
		localStorage.setItem('inputDelay', '0');

		var appleEat = false;
		var inputDelay = 0;
		var score = 6;

		var arena = createMatrix(25, 25);

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

		for (var i = 0; i < 6; i++) {
			snake.push(new snakeClass(6 - i, 1, i + 1));
		}

		var randomX = Math.floor((Math.random() * 24) + 1);
		var randomY = Math.floor((Math.random() * 24) + 1);
		while (arena[randomX][randomY] > 1) {
			randomX = Math.floor((Math.random() * 24) + 1);
			randomY = Math.floor((Math.random() * 24) + 1);
		}
		arena[randomX][randomY] = -1;

		drawArena();

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
					} else if (value === -1) {
						context.fillStyle = 'green';
					} else {
						context.fillStyle = 'rgb(55, 55, 55)'
					}
					context.fillRect(x, y, 1, 1);
					if (value === 1) {
						context.fillStyle = 'purple';
					} else if (value > 0) {
						context.fillStyle = 'red';
					}
					context.fillRect(x + 0.05, y + 0.05, 0.9, 0.9);
				});
			});
		}

		function update() {
			inputDelay += 1;
			for (var i = 0; i < snake.length; i++) {
				let snakethis = snake[snake.length - 1 - i];
				if (((snake[0].pos.x < 24 || momentum.x !== 1) && (snake[0].pos.y < 24 || momentum.y !== 1) && (snake[0].pos.x > 0 || momentum.x !== -1) && (snake[0].pos.y > 0 || momentum.y !== -1)) && !(arena[snake[0].pos.x + momentum.x][snake[0].pos.y + momentum.y] > 0)) {
					if (i === 0 || appleEat === true) {
						if (appleEat === true) {
							snake.push(new snakeClass(snake[snake.length - 1].pos.x, snake[snake.length - 1].pos.y, snake.length + 1));
							snake.push(new snakeClass(snake[snake.length - 1].pos.x, snake[snake.length - 1].pos.y, snake.length + 2));
							appleEat = false;
						}
						arena[snakethis.pos.x][snakethis.pos.y] = 0;
					}
					if (snakethis.value !== 1) {
						snakethis.pos.x = snake[snake.length - 2 - i].pos.x;
						snakethis.pos.y = snake[snake.length - 2 - i].pos.y;
					} else {
						if (arena[snakethis.pos.x + momentum.x][snakethis.pos.y + momentum.y] === -1) {
							var randomX = Math.floor((Math.random() * 24) + 1);
							var randomY = Math.floor((Math.random() * 24) + 1);
							while (arena[randomX][randomY] > 1) {
								randomX = Math.floor((Math.random() * 24) + 1);
								randomY = Math.floor((Math.random() * 24) + 1);
							}
							arena[randomX][randomY] = -1;
							appleEat = true;
							document.getElementById('score').innerText = "Length: " + (score + 2);
							score += 2;
						}
						snakethis.pos.x += momentum.x;
						snakethis.pos.y += momentum.y;
					}
					arena[snakethis.pos.x][snakethis.pos.y] = snakethis.value;
				} else {
					clearInterval(gameFlow);
					document.getElementById('message').innerText = 'Game End';
					gameOn = false;
				}
			}
			drawArena();
		}

		var gameFlow = window.setInterval(function() {
			update();
		}, 150);

		function moveMomentum(event) {
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
		document.onkeydown = function(event) {
			if (inputDelay !== parseInt(localStorage.getItem('inputDelay'))) {
				moveMomentum(event);
				localStorage.setItem('inputDelay', inputDelay);
			} else {
				window.setTimeout(function() {
					moveMomentum(event);
				}, 150);
			}
		}
	}
}