let spaceShip = document.getElementById('spaceShip');
let gameBoard = document.getElementById('gameBoard');
var bulletCheck = false;

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
    var timers= {};

    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
    //
    document.onkeydown= function(event) {
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
    document.onkeyup= function(event) {
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
    window.onblur= function() {
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
    	if (parseInt(spaceShip.style.left) > 5) {
			spaceShip.style.left = parseInt(spaceShip.style.left) - 4 + "px";
		}
    },
    39: function() {
    	if (parseInt(spaceShip.style.left) < 435) {
			spaceShip.style.left = parseInt(spaceShip.style.left) + 4 + "px";
		}
    },
    32: function() {
    	if (bulletCheck === false) {
    		//Creates the individual bullet
	    	var bullet = document.createElement("div");
			bullet.style.backgroundColor = "red";
			bullet.style.width = "5px";
			bullet.style.height = "10px";
			bullet.style.position = "absolute";
			bullet.style.top = spaceShip.style.top;
			bullet.style.left = parseInt(spaceShip.style.left) + 27.5 + "px";
			gameBoard.appendChild(bullet);
			
			var pew = new Audio("Assets/pew.mp3");
			pew.play();


			for (var i = 0; i <= 434; i++) {
				var x = setTimeout(() => {
					bullet.style.top = parseInt(bullet.style.top) - 1 + "px";
					
					var hitCheck = checkHit(bullet);

					if (hitCheck.tf === true) {

						clearTimeout(x);
						hitCheck.elem.remove();
						bullet.remove();
						
						if (hitCheck.elem.classList[0] == "One") {
							enemyOneDeath.play();
						} if (hitCheck.elem.classList[0] == "Two") {
							enemyTwoDeath.play();
						} if (hitCheck.elem.classList[0] == "Three") {
							enemyThreeDeath.play();
						}
					}
				}, 1 * i);
			}

			var x = setTimeout(() => {
				bullet.remove();
			}, 435);

			//250ms is the forced fire cap
			bulletCheck = true;
			var y = setTimeout(() => {bulletCheck = false;}, 250);
		}
    }
}, 10);

function checkHit(bullet) {
	var checkTrue;
	var elem = false;
	enemies.forEach(element => {
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

function levelOne() {

	for (var i = 0; i <= 17; i++) {
		var enemy = document.createElement("div");
		enemy.style.position = "absolute";
		enemy.style.top = enemyPos[i].top + "px";
		enemy.style.left = enemyPos[i].left + "px";
		enemy.style.backgroundImage = "url(Assets/enemy" + enemyPos[i].class + ".png)";
		enemy.style.width = "60px";
		enemy.style.height = "60px";
		enemy.style.transform = "scale(calc(1/3))";
		enemy.classList.add(enemyPos[i].class);
		gameBoard.appendChild(enemy);

		enemies.push(enemy);

		enemyMove(enemy);
		setInterval(enemyMove, 4000, enemy);
	}
}

function enemyMove(enemy) {
	var a = setTimeout(() => {
		enemy.style.left = parseInt(enemy.style.left) + 20 + "px";
	}, 1000);

	var b = setTimeout(() => {
		enemy.style.top = parseInt(enemy.style.top) + 20 + "px";
	}, 2000);

	var c = setTimeout(() => {
		enemy.style.left = parseInt(enemy.style.left) - 20 + "px";
	}, 3000);

	var d = setTimeout(() => {
		enemy.style.top = parseInt(enemy.style.top) - 20 + "px";
	}, 4000);
}

levelOne();