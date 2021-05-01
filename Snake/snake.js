function preventDefault(e) {
  e.preventDefault();
}

var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
window.addEventListener(wheelEvent, preventDefault, wheelOpt);
window.addEventListener('touchmove', preventDefault, wheelOpt);

var lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

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

		var arena = createMatrix(25, 40);

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

		var randomX = Math.floor((Math.random() * 39) + 1);
		var randomY = Math.floor((Math.random() * 24) + 1);
		while (arena[randomX][randomY] > 1) {
			randomX = Math.floor((Math.random() * 39) + 1);
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
						context.fillStyle = 'cyan';
					} else if (value > 0) {
						context.fillStyle = 'red';
					}
					context.fillRect(x + 0.05, y + 0.05, 0.9, 0.9);
				});
			});
		}

		var gameSpeed = 150;
		var	gamePause = false;
		function update(time = 0) {
			inputDelay += 1;
			for (var i = 0; i < snake.length; i++) {
				let snakethis = snake[snake.length - 1 - i];
				if (((snake[0].pos.x < 39 || momentum.x !== 1) && (snake[0].pos.y < 24 || momentum.y !== 1) && (snake[0].pos.x > 0 || momentum.x !== -1) && (snake[0].pos.y > 0 || momentum.y !== -1)) && !(arena[snake[0].pos.x + momentum.x][snake[0].pos.y + momentum.y] > 0)) {
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
					document.getElementById('message').innerText = 'Game End';
					gameOn = false;
				}
			}
			drawArena();
			window.setTimeout(function() {
				if (gameOn !== false && gamePause === false) {requestAnimationFrame(update);}
			}, gameSpeed);
		}

		update();
		//var gameFlow = window.setInterval(function() {update()}, gameSpeed);

		var speedCooldown = false;
		function moveMomentum(event) {
			console.log(event);
			if ((event.key == 'w' || event == 'w') && momentum.y !== 1) {
				momentum.y = -1;
				momentum.x = 0;
			} else if ((event.key == 's' || event == 's') && momentum.y !== -1) {
				momentum.y = 1
				momentum.x = 0;
			} else if ((event.key == 'd' || event == 'd') && momentum.x !== -1) {
				momentum.y = 0;
				momentum.x = 1;
			} else if ((event.key == 'a' || event == 'a') && momentum.x !== 1) {
				momentum.y = 0;
				momentum.x = -1;
			} else if (event.key == " " || event == "click") {
				if (gameSpeed !== 50 && speedCooldown === false) {
					document.getElementById('speedBurst').innerText = "NOT READY";
					document.getElementById('speedBurst').style.color = "red"
					gameSpeed = 40;
					window.setTimeout(function() {
						gameSpeed = 150;
						speedCooldown = true;
						window.setTimeout(function() {
							speedCooldown = false;
							document.getElementById('speedBurst').innerText = "READY";
							document.getElementById('speedBurst').style.color = "green"
						}, 1500);
					}, 500);
				}
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

		document.addEventListener('touchstart', handleTouchStart, false);        
		document.addEventListener('touchmove', handleTouchMove, false);

		var xDown = null;                                                        
		var yDown = null;

		function getTouches(evt) {
		  return evt.touches ||             // browser API
		         evt.originalEvent.touches; // jQuery
		}                                                     

		function handleTouchStart(evt) {
		    const firstTouch = getTouches(evt)[0];                                      
		    xDown = firstTouch.clientX;                                      
		    yDown = firstTouch.clientY;                                      
		};      

		document.onmousedown = function() {
			if (event.srcElement.id == "pause") {
				if (gamePause === true) {
					gamePause = false; update();
					document.getElementById('pause').innerText = "Pause";
				} else if (gamePause === false) {
					gamePause = true;
					document.getElementById('pause').innerText = "Paused";
				}
			} else if (event.srcElement !== document.getElementById('play') && gamePause === false && gameOn === true)  {
				moveMomentum('click');
			}
		}

		function handleTouchMove(evt) {
		    if ( ! xDown || ! yDown ) {
		        return;
		    }

		    var xUp = evt.touches[0].clientX;                                    
		    var yUp = evt.touches[0].clientY;

		    var xDiff = xDown - xUp;
		    var yDiff = yDown - yUp;


		    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
		        if ( xDiff > 0 ) {
		            /* left swipe */ 
		            moveMomentum('a');
		        } else {
		            /* right swipe */
		            moveMomentum('d')
		        }                       
		    } else {
		        if ( yDiff > 0 ) {
		            /* up swipe */ 
		            moveMomentum('w')
		        } else { 
		            /* down swipe */
		            moveMomentum('s');
		        }                                                                 
		    }
		    /* reset values */
		    xDown = null;
		    yDown = null;                                             
		};
	}
}