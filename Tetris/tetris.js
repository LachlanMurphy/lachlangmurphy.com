window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const canvas2 = document.getElementById('savedPiece');
const context2 = canvas2.getContext('2d');

var pause = false;
var resetCheck = false;
var gameStart = false;
var savedPieceCheck = false;

context.scale(20, 20);
context2.scale(40, 40);

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length -1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type)
{
    if (type === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'L') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (type === 'J') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
        ];
    } else if (type === 'O') {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (type === 'Z') {
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'T') {
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
}

function drawMatrix(matrix, offset, ghost) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                if (ghost === 1) {
                    context.fillStyle = 'white';
                } else {
                    context.fillStyle = colors[value];
                }
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos, 0);
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

function playerMove(offset) {
    player.pos.x += offset;
    if (collide(arena, player)) {
        player.pos.x -= offset;
    }
}

function playerReset() {

    const pieces = 'TJLOSZI';
    if (resetCheck === false) {
        player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    } else {
        player.matrix = createPiece(localStorage.getItem('savedPieceValue'));
    }
    ghostPlayer.matrix = player.matrix;

    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);
    player.score += 1;
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        document.getElementById("gameOver").style.visibility = "visible";
        pause = true;
        gameStart = false;
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

let dropCounter = 0;
var speedDrop = false;

let lastTime = 0;
function update(time = 0) {
    if (pause !== true) {
        if (resetCheck === true) {
            changeNextPiece(player.matrix, player.pos);
            localStorage.setItem('savedPieceMatrix', player.matrix);
        }

        if (speedDrop === true) {
            var dropInterval = 0;
            speedDrop = false;
        } else {
            if (player.score >= 380) {
                var dropInterval = 80;
            } else {
                var dropInterval = 1000 * (1.050 - (.050 * player.level));
            }
        }
        const deltaTime = time - lastTime;

        dropCounter += deltaTime;
        if (dropCounter > dropInterval) {
            playerDrop();
        }

        lastTime = time;

        draw();
        const ghostPlayer = {
            pos: {x: player.pos.x, y: player.pos.y},
            matrix: player.matrix,
            score: player.score,
            level: player.level,
        }
        while (collide(arena, ghostPlayer) === false) {
            ghostPlayer.pos.y++;
        }
        ghostPlayer.pos.y--;
        localStorage.setItem('ghostPlayer.pos.y', ghostPlayer.pos.y);
        drawMatrix(ghostPlayer.matrix, ghostPlayer.pos, 1);
        requestAnimationFrame(update);
    }
}

function updateScore() {
    player.level = Math.floor(player.score / 20) + 1;
    document.getElementById('score').innerText = "Score: " + player.score + " Level: " + player.level;
}

document.addEventListener('keydown', event => {
    if (gameStart === true) {
        if (event.keyCode === 37) {
            playerMove(-1);
        } else if (event.keyCode === 39) {
            playerMove(1);
        } else if (event.keyCode === 40) {
            playerDrop();
        } else if (event.keyCode === 81) {
            playerRotate(-1);
        } else if (event.keyCode === 38) {
            playerRotate(1);
        }        
    }
});

const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];

const arena = createMatrix(12, 20);

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: -1,
    level: 1,
};

const ghostPlayer = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: -1,
    level: 1,
}

playerReset();
updateScore();
document.getElementById("gameStart").onmousedown = function() {
    if (gameStart === false) {
        player.score = 0;
        player.level = 1
        context.clearRect(0, 0, canvas.width, canvas.height);
        gameStart = true;
        document.getElementById("gameOver").style.visibility = "hidden";
        pause = false;
        updateScore();
        update();
    }
}

document.onkeydown = function(event) {
    if (gameStart === true) {
        if (document.getElementById("gameOver").style.visibility != "visible") {
            if (event.keyCode === 27) {
                if (pause === false) {
                    pause = true;
                    document.getElementById("pause").style.visibility = 'visible';
                } else {
                    pause = false;
                    document.getElementById("pause").style.visibility = 'hidden';
                    update();
                }
            }
        }

        if (event.keyCode === 32) {
            player.pos.y = localStorage.getItem('ghostPlayer.pos.y');
            speedDrop = true;
        }

        if (event.keyCode === 67) {
            if (savedPieceCheck === false) {
                context2.clearRect(0, 0, canvas.width, canvas.height);
                savedPieceCheck = true;
                resetCheck = true;
                update();
                resetCheck = false;
                playerReset();
            } else {
                if (localStorage.getItem('savedPieceMatrix') == '0,7,0,7,7,7,0,0,0') {
                    localStorage.setItem('savedPieceValue', 'T');
                } else if (localStorage.getItem('savedPieceMatrix') == '0,2,0,0,2,0,0,2,2') {
                    localStorage.setItem('savedPieceValue', 'L');
                } else if (localStorage.getItem('savedPieceMatrix') == '4,4,4,4') {
                    localStorage.setItem('savedPieceValue', 'O');
                } else if (localStorage.getItem('savedPieceMatrix') == '0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0') {
                    localStorage.setItem('savedPieceValue', 'I');
                } else if (localStorage.getItem('savedPieceMatrix') == '5,5,0,0,5,5,0,0,0') {
                    localStorage.setItem('savedPieceValue', 'Z');
                } else if (localStorage.getItem('savedPieceMatrix') == '0,6,6,6,6,0,0,0,0') {
                    localStorage.setItem('savedPieceValue', 'S');
                } else if (localStorage.getItem('savedPieceMatrix') == '0,3,0,0,3,0,3,3,0') {
                    localStorage.setItem('savedPieceValue', 'J');
                }
                resetCheck = true;
                playerReset();
                context2.clearRect(0, 0, canvas.width, canvas.height);
                savedPieceCheck = false;
                resetCheck = false;
            }
        }
    }
}

function changeNextPiece(matrix, offset) {
    context2.fillStyle = '#000';
    context2.fillRect(0, 0, canvas2.width, canvas2.height)
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context2.fillStyle = colors[value];
                context2.fillRect(x + 1, y + 1, 1, 1);
            }
        });
    });
}