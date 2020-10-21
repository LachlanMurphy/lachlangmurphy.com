function createMineField(rows, columns) {
    localStorage.setItem('gameStart', 'false');
    var element = document.getElementById('mineField');
    if (typeof(element) != 'undefined' && element != null) {
        element.remove();
    }
    var mineField = document.createElement('div');
    mineField.id = "mineField";
    document.body.appendChild(mineField);
    mineField.style.height = (rows * 12) + "px";
    mineField.style.width = (columns * 12) + "px";
    mineField.style.border = "solid 5px black"

    var cellArray = [];
    for (var i = 0; rows > i; i++) {
        var row = document.createElement('div');
        row.id = "row" + (i + 1);
        mineField.appendChild(row);
        row.style.height = "10px";
        row.style.width = (columns * 12);
        for (var t = 0; columns > t; t++) {
            var cell = document.createElement('div');
            cell.id = "cell" + (i + 1) + "-" + (t + 1);
            cell.x = t + 1;
            cell.y = i + 1;
            row.appendChild(cell);
            cell.style.height = "10px";
            cell.style.width = "10px";
            cell.style.borderTop = "solid 1px white";
            cell.style.borderLeft = "solid 1px white";
            cell.style.borderBottom = "solid 1px grey";
            cell.style.borderRight = "solid 1px grey";
            cell.style.backgroundColor = "lightgrey";
            cell.style.userSelect = "none";
            cell.style.float = "left";
            cellArray.push(cell);
        }
    }
    cellArray.forEach(function(elem) {
        elem.addEventListener("mouseover", function() {
            elem.style.borderTop = "solid 1px grey";
            elem.style.borderLeft = "solid 1px grey";
            elem.style.borderBottom = "solid 1px lightgrey";
            elem.style.borderRight = "solid 1px lightgrey";
        });
        elem.addEventListener("mouseout", function() {
            elem.style.borderTop = "solid 1px white";
            elem.style.borderLeft = "solid 1px white";
            elem.style.borderBottom = "solid 1px grey";
            elem.style.borderRight = "solid 1px grey";
        });
        elem.addEventListener("mousedown", function() {
            if (localStorage.getItem('gameStart') != 'true') {
                localStorage.setItem('gameStart', 'true');
                gameStart(elem, rows, columns, cell.x, cell.y);
            } else {
                localStorage.setItem('gameStart', 'false');
            }
        });
    });
}

function gameStart(cell, rows, columns, x, y) {
    var bombNumbers = [];
    var bombs = Math.round(rows * columns / 8);
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
                if (i !== 0 && document.getElementById('cell' + i + '-' + (t + 1)).bomb === -1) {
                    tempCell.bomb++;
                }
                if (i !== 0 && (t + 1) !== columns && document.getElementById('cell' + i + '-' + (t + 2)).bomb === -1) {
                    tempCell.bomb++;
                }
                if ((t + 1) !== columns && document.getElementById('cell' + (i + 1) + '-' + (t + 2)).bomb === -1) {
                    tempCell.bomb++;
                }
                if ((i + 1) !== rows && (t + 1) !== columns && document.getElementById('cell' + (i + 2) + '-' + (t + 2)).bomb === -1) {
                    tempCell.bomb++;
                }
                if ((i + 1) !== rows && document.getElementById('cell' + (i + 2) + '-' + (t + 1)).bomb === -1) {
                    tempCell.bomb++;
                }
                if ((i + 1) !== rows && t !== 0 && document.getElementById('cell' + (i + 2) + '-' + t).bomb === -1) {
                    tempCell.bomb++;
                }
                if (t !== 0 && document.getElementById('cell' + (i + 1) + '-' + t).bomb === -1) {
                    tempCell.bomb++;
                }
                if (i !== 0 && t !== 0 && document.getElementById('cell' + i + '-' + t).bomb === -1) {
                    tempCell.bomb++;
                }
            }
            tempCell.innerText = tempCell.bomb;
        }

        if (cell.bomb !== 0) {
            gameStart(cell, rows, columns, x, y);
        }
    }

}

createMineField(8, 10);