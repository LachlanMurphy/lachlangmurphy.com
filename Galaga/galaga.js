const socket = io('https://account.lachlangmurphy.com');
let user;
if (localStorage.getItem('user') != null) {
    socket.emit('getUserData', localStorage.getItem('user'));
}

socket.on('userData', data => {
    user = data;
    document.getElementById('account').innerHTML = user.firstName;
});

socket.on('failedSetHigh', () => {
    console.log("Could not set high score.");
});

socket.on('sendKey', key => {
	let param = new URLSearchParams();
	param.append('user', key);
	let url = "https://account.lachlangmurphy.com/account/?" + param.toString();
	window.location.href = url;
});

function account() {
	if (user != null)
		socket.emit('requestKey', user.email);
	else
		window.location.href = "https://account.lachlangmurphy.com/signin/";
}

let spaceShip = document.getElementById('spaceShip');
let gameBoard = document.getElementById('gameBoard');
let playerLevel = document.getElementById('level');
let playerScore = document.getElementById('score');

var bulletCheck = false;
var endGameCheck = false;

gameBoard.style.left = "calc(50% - 250px)";

spaceShip.style.left = "20px";
spaceShip.style.top = "425px";

var enemyOneDeath = new Audio("Assets/enemyOneDeath.mp3");
var enemyTwoDeath = new Audio("Assets/enemyTwoDeath.mp3");
var enemyThreeDeath = new Audio("Assets/enemyThreeDeath.mp3");



// Keyboard input with customisable repeat (set to 0 for no key repeat)
//
function KeyboardController(keys, repeat) {
    // Lookup of key codes to timer ID, or null for no repeat
    //
    var timers = {};

    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
    //
    document.onkeydown = function(event) {
        var key= (event || window.event).keyCode;
        if (!(key in keys))
            return true;
        if (!(key in timers)) {
            timers[key]= null;
            keys[key]();
            if (repeat!==0)
                timers[key]= setInterval(keys[key], repeat);
        }
        return false;
    };

    // Cancel timeout and mark key as released on keyup
    //
    document.onkeyup = function(event) {
        var key= (event || window.event).keyCode;
        if (key in timers) {
            if (timers[key]!==null)
                clearInterval(timers[key]);
            delete timers[key];
        }
    };

    // When window is unfocused we may not get key events. To prevent this
    // causing a key to 'get stuck down', cancel all held keys
    //
    window.onblur = function() {
        for (key in timers)
            if (timers[key]!==null)
                clearInterval(timers[key]);
        timers= {};
    };
};

// Arrow key movement.
//
KeyboardController({
    37: function() {
    	if (parseInt(spaceShip.style.left) > 5 && endGameCheck === false) {
			spaceShip.style.left = parseInt(spaceShip.style.left) - 4 + "px";
		}
    },
    39: function() {
    	if (parseInt(spaceShip.style.left) < 435 && endGameCheck === false) {
			spaceShip.style.left = parseInt(spaceShip.style.left) + 4 + "px";
		}
    },
    32: function() {
    	if (bulletCheck === false && endGameCheck === false) {
    		if (gameLevel > 25) {
    			spaceShipShoot(0);
    			spaceShipShoot(1);
    		} if (gameLevel <= 25) {
    			spaceShipShoot(2);
    		}
    		
    		//250ms is the forced fire cap
			bulletCheck = true;
			if (gameLevel > 50) {
				var y = setTimeout(() => {bulletCheck = false;}, 200);
			} if (gameLevel <= 50) {
				var y = setTimeout(() => {bulletCheck = false;}, 250);
			}
		}
    },
    27: function() {
    	debugger;
    }
}, 10);

function spaceShipShoot(k) {
	var bullet = document.createElement("div");
	bullet.style.backgroundColor = "red";
	bullet.style.width = "5px";
	bullet.style.height = "10px";
	bullet.style.position = "absolute";
	bullet.style.top = spaceShip.style.top;
	if (k === 0) {
		bullet.style.left = parseInt(spaceShip.style.left) + 22 + "px";
	} if (k === 1) {
		bullet.style.left = parseInt(spaceShip.style.left) + 33 + "px";
	} if (k ===2) {
		bullet.style.left = parseInt(spaceShip.style.left) + 27.5 + "px";
	}
	gameBoard.appendChild(bullet);
	
	var pew = new Audio("Assets/pew.mp3");
	pew.play();


	for (var i = 0; i <= 434; i++) {
		var removeCheck = false;
		var x = setTimeout(() => {
			if (removeCheck === false) {
				bullet.style.top = parseInt(bullet.style.top) - 1 + "px";
				
				var hitCheck = checkHit(bullet);

				if (hitCheck.tf === true) {

					removeCheck = true;
					enemies.splice(parseInt(hitCheck.elem.id), 1, null);
					clearInterval(enemyAttackPatterns[parseInt(hitCheck.elem.id)]);
					enemyAttackPatterns.splice(parseInt(hitCheck.elem.id), 1, null);
					hitCheck.elem.id = parseInt(hitCheck.elem.id) + "attacking";
					hitCheck.elem.remove();
					gameLevelSelect();

					bullet.remove();
					
					if (hitCheck.elem.classList[0].includes("One")) {
						enemyOneDeath.play();
						playerScore.innerHTML = "Score: " + (parseInt(playerScore.innerText.match(/(\d+)/)[0]) + 100);
					} if (hitCheck.elem.classList[0].includes("Two")) {
						enemyTwoDeath.play();
						playerScore.innerHTML = "Score: " + (parseInt(playerScore.innerText.match(/(\d+)/)[0]) + 25);
					} if (hitCheck.elem.classList[0].includes("Three")) {
						enemyThreeDeath.play();
						playerScore.innerHTML = "Score: " + (parseInt(playerScore.innerText.match(/(\d+)/)[0]) + 25);
					}
				}
			}
		}, 1 * i);
	}
	var x = setTimeout(() => {
		bullet.remove();
	}, 435);
}

function checkHit(bullet) {
	var checkTrue;
	var elem = false;
	enemies.forEach(element => {
		if (element !== null) {
			const bulletRect = bullet.getBoundingClientRect();
			const enemyRect = element.getBoundingClientRect();

			if (bulletRect.top > enemyRect.bottom || bulletRect.right < enemyRect.left || bulletRect.bottom < enemyRect.top || bulletRect.left > enemyRect.right === true) {
				if (checkTrue !== true) {
					checkTrue = false;
				}
			} else {
				checkTrue = true;
				elem = element;
			}
		}
	});

	if (checkTrue === true) {
		return {
			tf: true,
			elem: elem
		}
	} else {
		return {
			tf: false,
			elem: null
		}
	}
}

var enemies = [];
const enemyPos = [
	{top: 50, left: 50, class: "One"},
	{top: 50, left: 150, class: "One"},
	{top: 50, left: 250, class: "One"},
	{top: 50, left: 350, class: "One"},
	{top: 100, left: 50, class: "Two"},
	{top: 100, left: 100, class: "Two"},
	{top: 100, left: 150, class: "Two"},
	{top: 100, left: 200, class: "Two"},
	{top: 100, left: 250, class: "Two"},
	{top: 100, left: 300, class: "Two"},
	{top: 100, left: 350, class: "Two"},
	{top: 150, left: 50, class: "Three"},
	{top: 150, left: 100, class: "Three"},
	{top: 150, left: 150, class: "Three"},
	{top: 150, left: 200, class: "Three"},
	{top: 150, left: 250, class: "Three"},
	{top: 150, left: 300, class: "Three"},
	{top: 150, left: 350, class: "Three"},
	
]

function enemyAttack(enemy, difficultyAttackTime) {
	
	if (Math.random() * 100 > difficultyAttackTime && enemy.id.includes("attacking") === false && enemies[parseInt(enemy.id)] !== null && enemy.classList[1].includes(gameLevel.toString())) {
		
		enemyAttackPatterns.splice(enemy.id, 1, null);
		clearInterval(enemyAttackPatterns[enemy.id]);

		if (enemy.classList[0].includes("One") && document.getElementById(parseInt(enemy.id).toString() + "bullet") === null) {
			
			enemyShoot(enemy);
			enemyShoot(enemy);
		}

		attackAnimation(enemy);
	}
}

function enemyCheckHit(object) {
	const objectRect = object.getBoundingClientRect();
	const spaceShipRect = spaceShip.getBoundingClientRect();

	if (objectRect.top > spaceShipRect.bottom || objectRect.right < spaceShipRect.left || objectRect.bottom < spaceShipRect.top || objectRect.left > spaceShipRect.right === true) {
		return false;
	} else {
		return true;
	}
}

function enemyShoot(enemy) {
	var bullet = document.createElement("div");
	bullet.style.backgroundColor = "red";
	bullet.style.width = "5px";
	bullet.style.height = "10px";
	bullet.style.position = "absolute";
	bullet.style.top = enemy.style.top;
	bullet.style.left = enemy.style.left;
	bullet.classList.add(enemy.id);
	bullet.classList.add(enemy.classList[1]);
	bullet.id = parseInt(enemy.id) + "bullet";
	gameBoard.appendChild(bullet);
	
	var pew = new Audio("Assets/pew.mp3");
	//pew.play();

	var slope = (Math.random() + 1 * 8);
	if (Math.random() < .5) {
		slope = slope * -1;
	}
	var b = parseInt(bullet.style.top) - (slope * parseInt(bullet.style.left));


	for (var i = 0; i <= 250; i++) {
		var x = setTimeout(() => {
			bullet.style.top = parseInt(bullet.style.top) + 2 + "px";
			bullet.style.left = (parseInt(bullet.style.top) - b) / slope + "px";
			if (enemyCheckHit(bullet)) {
				endGame();
			}
		}, 8 * i);
	}
	setTimeout(() => {bullet.remove(); clearTimeout(x);}, 251 * 8);
}

function attackAnimation(enemy) {
	enemy.style.transform = "rotate(180deg) scale(calc(1/3))";
	enemy.id = enemy.id + "attacking";

	let y = enemy.style.top;
	let x = enemy.style.left;

	var slope = (Math.random() + 1 * 5);
	if (Math.random() < .5) {
		slope = slope * -1;
	}
	var b = parseInt(y) - (slope * parseInt(x));

	var enemyAttacking = setInterval(() => {
		enemy.style.top = parseInt(enemy.style.top) + 2 + "px";
		enemy.style.left = (parseInt(enemy.style.top) - b) / slope + "px";
		if (enemyCheckHit(enemy)) {
			endGame();
		}

		if (parseInt(enemy.style.top) >= 500) {
			enemy.id = parseInt(enemy.id).toString();
			clearInterval(enemyAttacking);

			enemy.style.transform = "scale(calc(1/3))";
			enemy.style.top = "-20px";

			var enemyFall = setInterval(() => {

				enemy.style.top = parseInt(enemy.style.top) + 1 + "px";
				if (globalTimer === 1 || globalTimer === 2) {
					enemy.style.left = parseInt(enemyPos[parseInt(enemy.id)].left) + 20 + "px";
				} if (globalTimer === 3 || globalTimer === 0) {
					enemy.style.left = parseInt(enemyPos[parseInt(enemy.id)].left) - 20 + "px";
				}

				if (parseInt(enemy.style.top) >= enemyPos[parseInt(enemy.id)].top) {
					clearInterval(enemyFall);
				}
			}, 10)
		}
	}, 10);
}

function enemyMove(enemy) {
	var a = setTimeout(() => {
		if (enemy.id.includes("attacking") === false) {
			enemy.style.left = parseInt(enemyPos[enemy.id].left) + 20 + "px";
		}
	}, 1000);

	var b = setTimeout(() => {
		if (enemy.id.includes("attacking") === false) {
			enemy.style.top = parseInt(enemyPos[enemy.id].top) + 20 + "px";
		}
	}, 2000);

	var c = setTimeout(() => {
		if (enemy.id.includes("attacking") === false) {
			enemy.style.left = parseInt(enemyPos[enemy.id].left) - 20 + "px";
		}
	}, 3000);

	var d = setTimeout(() => {
		if (enemy.id.includes("attacking") === false) {
			enemy.style.top = parseInt(enemyPos[enemy.id].top) - 20 + "px";
		}
	}, 4000);
}

var enemyMovePatterns = [];
var enemyAttackPatterns = [];
const globalTimerIntervals = [20, -20, -20, 20];

function levelCreate(level) {

	for (var i = 0; i <= 17; i++) {
		var enemy = document.createElement("div");
		enemy.style.position = "absolute";
		enemy.style.top = enemyPos[i].top + "px";
		enemy.style.left = enemyPos[i].left + "px";
		enemy.style.backgroundImage = "url(Assets/enemy" + enemyPos[i].class + ".png)";
		enemy.style.width = "60px";
		enemy.style.height = "60px";
		enemy.style.transform = "scale(calc(1/3))";
		enemy.id = i.toString();
		enemy.classList.add(enemyPos[i].class);
		enemy.classList.add(gameLevel);
		gameBoard.appendChild(enemy);
		enemies.push(enemy);

		var difficultyAttackTime = -level + 100
		if (difficultyAttackTime < 0) {
			difficultyAttackTime = 0;
		}

		enemyMove(enemy);
		enemyMovePatterns.push(setInterval(enemyMove, 4000, enemy));

		enemyAttack(enemy, difficultyAttackTime);
		enemyAttackPatterns.push(setInterval(enemyAttack, 1000, enemy, difficultyAttackTime));
	}
	timer = 0;
	setInterval(() => {
		timer = timer + 1;
		globalTimer = timer % 4;
	}, 1000);
}

var gameLevel = 0;

function gameLevelSelect() {

	endLevelCheck = true;
	enemies.forEach(element => {
		if (element !== null && endLevelCheck !== false) {
			endLevelCheck = false;
		}
	});

	
	if (endLevelCheck === true) {
		gameLevel++;
		for (var i = enemyAttackPatterns.length - 1; i >= 0; i--) {
			clearInterval(enemyAttackPatterns[i]);
			enemyAttackPatterns.splice(i, 1, null);
		}

		playerLevel.innerHTML = "Level: " + gameLevel;

		enemies.length = 0;
		enemyMovePatterns.length = 0;
		enemyAttackPatterns.length = 0;


		levelCreate(gameLevel);
	}
}

gameLevelSelect();

function endGame() {
	spaceShip.remove();
	endGameCheck = true;
	let highScore = "Sign In!";
	let score = parseInt(playerScore.innerText.match(/(\d+)/)[0]);
	if (localStorage.getItem('user') != null) {
		highScore = user.galagaHigh;
	}
	if (user != null && score > user.galagaHigh) {
		highScore = score;
		user.galagaHigh = score;
		socket.emit('setHigh', [user.email,'galagaHigh',score]);
	}
	document.getElementById('endGameScreenWords').innerText = "Game Over\nScore: "+score+"\nHigh Score: "+highScore;
	document.getElementById('endGameScreen').style.display = "inline-block";
}