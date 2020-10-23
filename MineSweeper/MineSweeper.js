function createMineField(rows, columns) {
    document.getElementById('timer').innerText = "00h:00m:00s";
    if (rows * columns <= 9 || rows < 4 || columns < 4) {
        document.getElementById('errorMessage').innerText = "Width Or Height Values Too Low.";
        return;
    } else if (document.getElementById('bombAmount').value >= rows * columns / 2) {
        document.getElementById('errorMessage').innerText = "Number of bombs exceeds number of cells.";
        return;
    } else {
        document.getElementById('errorMessage').innerText = "Mine Sweeper";
    }
    localStorage.setItem('gameStart', 'false');
    localStorage.setItem('gameEnd', 'false');
    localStorage.setItem('gameRestart', 'true');
    var element = document.getElementById('mineField');
    if (typeof(element) != 'undefined' && element != null) {
        element.remove();
    }
    var mineField = document.createElement('div');
    mineField.id = "mineField";
    document.body.appendChild(mineField);
    mineField.style.height = (rows * 22) + "px";
    mineField.style.width = (columns * 22) + "px";
    mineField.style.border = "solid 5px black";
    mineField.style.backgroundColor = "lightgrey";
    mineField.style.marginLeft = "auto";
    mineField.style.marginRight = "auto";

    var cellArray = [];
    for (var i = 0; rows > i; i++) {
        var row = document.createElement('div');
        row.id = "row" + (i + 1);
        mineField.appendChild(row);
        row.style.height = "10px";
        row.style.width = (columns * 22) + "px";
        for (var t = 0; columns > t; t++) {
            var cell = document.createElement('div');
            cell.id = "cell" + (i + 1) + "-" + (t + 1);
            cell.x = t + 1;
            cell.y = i + 1;
            row.appendChild(cell);
            cell.style.height = "20px";
            cell.style.width = "20px";
            cell.style.borderTop = "solid 1px white";
            cell.style.borderLeft = "solid 1px white";
            cell.style.borderBottom = "solid 1px grey";
            cell.style.borderRight = "solid 1px grey";
            cell.style.backgroundColor = "lightgrey";
            cell.style.userSelect = "none";
            cell.style.float = "left";
            cell.style.fontSize = "20px";
            cell.style.fontFamily = 'retro';
            cell.style.textAlign = "center";
            cell.reveal = false;
            cellArray.push(cell);
        }
    }
    cellArray.forEach(function(elem) {
        elem.addEventListener("mouseover", function() {
            if (elem.reveal === false) {
                elem.style.backgroundColor = "brown";
                elem.style.borderTop = "solid 1px grey";
                elem.style.borderLeft = "solid 1px grey";
                elem.style.borderBottom = "solid 1px lightgrey";
                elem.style.borderRight = "solid 1px lightgrey";
            }
        });
        elem.addEventListener("mouseout", function() {
            if (elem.reveal === false) {
                elem.style.backgroundColor = "lightgrey";
                elem.style.borderTop = "solid 1px white";
                elem.style.borderLeft = "solid 1px white";
                elem.style.borderBottom = "solid 1px grey";
                elem.style.borderRight = "solid 1px grey";
            }
        });
        elem.addEventListener("mousedown", function(event) {
            if (localStorage.getItem('gameEnd') != 'true' && document.getElementById('errorMessage').innerText != "Number of bombs exceeds number of cells.") {
                if (elem.innerText != "F") {
                    elem.style.backgroundColor = "lightgrey";
                }
                if (event.button !== 2) {
                    if (localStorage.getItem('gameStart') != 'true') {
                        localStorage.setItem('gameStart', 'false');
                        gameStart(elem, rows, columns, cell.x, cell.y);
                    } else {
                        clickField(elem, rows, columns);
                    }
                } else {
                    clickField(elem, rows, columns);
                }
            }
        });
        elem.addEventListener('contextmenu', event => event.preventDefault());
    });
}

function gameStart(cell, rows, columns, x, y) {
    var bombNumbers = [];
    if (document.getElementById('bombAmount').value == "") {
        if (rows === 16 && columns === 30) {
            var bombs = 99;
        } else {
            var bombs = Math.round(rows * columns / 8);
        }
    } else {
        var bombs = document.getElementById('bombAmount').value;
    }

    localStorage.setItem('bombAmount', bombs);
    while (bombNumbers.length < bombs) {
        var bombTemp = {x: Math.floor(Math.random() * Math.floor(columns)) + 1, y: Math.floor(Math.random() * Math.floor(rows)) + 1};
        if (bombNumbers.length !== 0) {
            var repeatCheck = 0;
            for (var i = 0; i < bombNumbers.length; i++) {
                if (bombNumbers[i].x !== bombTemp.x || bombNumbers[i].y !== bombTemp.y) {
                    repeatCheck++;
                }
            }
            if (i === repeatCheck && cell.x !== bombTemp.x && cell.y !== bombTemp.y) {
                bombNumbers.push(bombTemp);
            }
        } else if (cell.x !== bombTemp.x && cell.y !== bombTemp.y) {
            bombNumbers.push(bombTemp);
        }
    }

    var assignCheck = false;
    for (var i = 0; i < rows; i++) {
        for (var t = 0; t < columns; t++) {
            for (var z = 0; z < bombNumbers.length; z++) {
                if (bombNumbers[z].x === document.getElementById('cell' + (i + 1) + '-' + (t + 1)).x && bombNumbers[z].y === document.getElementById('cell' + (i + 1) + '-' + (t + 1)).y) {
                    document.getElementById('cell' + (i + 1) + '-' + (t + 1)).bomb = -1;
                    assignCheck = true;
                } else if (assignCheck === false) {
                    document.getElementById('cell' + (i + 1) + '-' + (t + 1)).bomb = 0;
                }
            }
            assignCheck = false;
        }
    }

    for (var i = 0; i < rows; i++) {
        for (var t = 0; t < columns; t++) {
            let tempCell = document.getElementById('cell' + (i + 1) + '-' + (t + 1));
            if (tempCell.bomb !== -1) {
                tempCell.bomb = 0;
                var cellSurroundings = [
                    {x: -1, y: -1},
                    {x: 0, y: -1},
                    {x: 1, y: -1},
                    {x: 1, y: 0},
                    {x: 1, y: 1},
                    {x: 0, y: 1},
                    {x: -1, y: 1},
                    {x: -1, y: 0}
                ]
                
                for (var z = 0; z < 8; z++) {
                    if ((i + 1 + cellSurroundings[z].y) !== 0 && (t + 1 + cellSurroundings[z].x) !== 0 && (i + cellSurroundings[z].y) !== rows && (t + cellSurroundings[z].x) !== columns && document.getElementById('cell' + (i + 1 + cellSurroundings[z].y) + '-' + (t + 1 + cellSurroundings[z].x)).bomb === -1) {
                        tempCell.bomb++;
                    }
                }
                colorPick(tempCell);
            }
        }
        if (cell.bomb !== 0) {
            gameStart(cell, rows, columns, x, y);
        }
    }
    clickField(cell, rows, columns);
    localStorage.setItem('gameStart', 'true');
    timerStart();
}

function clickField(cell, rows, columns) {
    if (event.button === 2 && cell.reveal === false) {
        if (cell.innerText == "F") {
            cell.innerText = "";
            colorPick(cell);
        } else {
            cell.style.color = "red";
            cell.innerText = "F";
        }
    } else if (cell.innerText != "F") {
        if (cell.bomb === -1) {
            endGame(rows, columns);
        } else if (cell.bomb > 0 && cell.reveal === false) {
            gameWin(cell, rows, columns);
        } else if (event.button !== 2 && (cell.bomb === 0 || document.getElementById('checkBox').checked === true)) {
            cell.reveal = true;
            if (document.getElementById('checkBox').checked === true && cell.bomb !== 0) {
                gameWin(cell, rows, columns);
            }
            checkSurroundings(cell, rows, columns);
        }
    }
}

function timerStart() {
    localStorage.setItem('gameRestart', 'false');
    let timer = document.getElementById('timer');
    var countDownDate = new Date().getTime();
    var x = setInterval(function() {
        if (localStorage.getItem('gameEnd') != 'true' && localStorage.getItem('gameRestart') == 'false') {
            var now = new Date().getTime();
            var distance = now - countDownDate;
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            timer.innerText = ('0' + hours).slice(-2) + "h:" + ('0' + minutes).slice(-2) + "m:" + ('0' + seconds).slice(-2) + "s";
        } else {
            clearInterval(x);
        }
    }, 1000);
}

document.getElementById('Submit').onmousedown = function() {
    localStorage.setItem('gameRestart', 'true');
    if (document.getElementById('fieldWidth').value == "") {
        var columns = 30;
    } else {
        var columns = parseInt(document.getElementById('fieldWidth').value);
    }

    if (document.getElementById('fieldHeight').value == "") {
        var rows = 16;
    } else {
        var rows = parseInt(document.getElementById('fieldHeight').value);
    }

    createMineField(rows, columns);
}

function endGame(rows, columns) {
    for (var i = 0; i < rows; i++) {
        for (var t = 0; t < columns; t++) {
            let cellThis = document.getElementById('cell' + (i + 1) + '-' + (t + 1));
            if (cellThis.bomb === -1) {
                cellReveal(cellThis);
                cellThis.innerText = "";
                var img = document.createElement('img');
                img.src = "bomb.png";
                cellThis.appendChild(img);
            }
        }
    }
    document.getElementById('errorMessage').innerText = "Board Failed";
    localStorage.setItem('gameEnd', 'true');
}

function colorPick(cell) {
    if (cell.bomb === 1) {
            cell.style.color = "green";
        } else if (cell.bomb === 2) {
            cell.style.color = "blue";
        } else if (cell.bomb === 3) {
            cell.style.color = "orange";
        } else if (cell.bomb === 4) {
            cell.style.color = "purple";
        } else if (cell.bomb === 5) {
            cell.style.color = "black";
        } else if (cell.bomb >= 6) {
            cell.style.color = "red";
    }
}

function gameWin(cell, rows, columns) {
    cell.reveal = true;
    cell.innerText = cell.bomb;
    var winCheck = 0;
    for (var i = 0; i < rows; i++) {
        for (var t = 0; t < columns; t++) {
            if (document.getElementById('cell' + (i + 1) + '-' + (t + 1)).reveal === true) {
                winCheck++;
            }
        }
    }

    if (winCheck === (rows * columns) - parseInt(localStorage.getItem('bombAmount'))) {
        localStorage.setItem('gameEnd', 'true');
        document.getElementById('errorMessage').innerText = "Game Finsihed";
    }
}

function checkSurroundings(cell, rows, columns) {
    var surroundingCell = [
        {x: -1, y: -1},
        {x: 0, y: -1},
        {x: 1, y: -1},
        {x: 1, y: 0},
        {x: 1, y: 1},
        {x: 0, y: 1},
        {x: -1, y: 1},
        {x: -1, y: 0}
    ]

    cellReveal(cell);
    if (document.getElementById('checkBox').checked === true && cell.bomb !== 0) {
        gameWin(cell, rows, columns);
    }

    for (var i = 0; i < 8; i++) {
        let cellThis = document.getElementById('cell' + (cell.y + surroundingCell[i].y) + '-' + (cell.x + surroundingCell[i].x));
        if ((cell.y + surroundingCell[i].y) !== 0 && (cell.x + surroundingCell[i].x) !== 0 && (cell.y - 1 + surroundingCell[i].y) !== rows && (cell.x - 1 + surroundingCell[i].x) !== columns && cellThis.bomb !== -1 && cellThis.reveal !== true && cellThis.innerText != "F") {
            if (cellThis.bomb === 0) {
                checkSurroundings(cellThis, rows, columns);
            } else {
                cellReveal(cellThis);
            }
        } else if ((cell.y - 1) !== 0 && (cell.x - 1) !== 0 && cell.y !== rows && cell.x !== columns && document.getElementById('checkBox').checked === true && cellThis.innerText != "F" && cellThis.bomb === -1) {
            endGame(rows, columns);
        }
    }
    gameWin(cell, rows, columns);
}

function cellReveal(cell) {
    cell.style.borderTop = "solid 1px grey";
    cell.style.borderLeft = "solid 1px grey";
    cell.style.borderBottom = "solid 1px lightgrey";
    cell.style.borderRight = "solid 1px lightgrey";
    cell.reveal = true;
    if (cell.bomb > 0) {
        cell.innerText = cell.bomb;
    }
}

createMineField(8, 10);