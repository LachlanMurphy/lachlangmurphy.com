function createMineField(rows, columns) {
    var element = document.getElementById('mineField');
    if (typeof(element) != 'undefined' && element != null) {
        element.remove();
    }
    var mineField = document.createElement('div');
    mineField.id = "mineField";
    document.body.appendChild(mineField);
    mineField.style.height = ((rows * 10) + (rows * 2)) + "px";
    mineField.style.width = ((columns * 10) + (columns * 2)) + "px";
    mineField.style.border = "solid 5px black"

    var cellArray = [];
    for (var i = 0; rows > i; i++) {
        var row = document.createElement('div');
        row.id = "row" + (i + 1);
        mineField.appendChild(row);
        row.style.height = "10px";
        row.style.width = mineField.style.width;
        for (var t = 0; columns > t; t++) {
            var cell = document.createElement('div');
            cell.id = "cell" + (i + 1) + "-" + (t + 1);
            row.appendChild(cell);
            cell.style.height = "10px";
            cell.style.width = "10px";
            cell.style.borderTop = "solid 1px white";
            cell.style.borderLeft = "solid 1px white";
            cell.style.borderBottom = "solid 1px grey";
            cell.style.borderRight = "solid 1px grey";
            cell.style.backgroundColor = "lightgrey";
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
                gameStart(elem);
            } else {
                localStorage.setItem('gameStart', 'false');
            }
        });
    });
}

function gameStart(cell) {
    console.log(cell);
    var bombNumbers = [];
    while (bombNumbers.length < Math.round(rows * columns / 8)) {
        var bombTemp = {x: Math.floor(Math.random() * Math.floor(columns)) + 1, y: Math.floor(Math.random() * Math.floor(rows)) + 1};
        if (bombNumbers.length !== 0) {
            var repeatCheck = 0;
            for (var i = 0; i < bombNumbers.length; i++) {
                if (bombNumbers[i].x !== bombTemp.x && bombNumbers[i].y !== bombTemp.y) {
                    repeatCheck++;
                }
                if (i === bombNumbers.length - 1 && i === repeatCheck) {
                    bombNumbers.push(bombTemp);
                }
            }
        } else {
            bombNumbers.push(bombTemp);
        }
    }

    cell.bomb = 0;
    for (var z = 0; z < bombNumbers.length; z++) {
        if (bombNumbers[z].x === t + 1 && bombNumbers[z].y === i + 1) {
            cell.bomb = -1;
        }
    }
    if (cell.bomb !== -1) {
        if (document.getElementById('cell' + i + '-' + (t + 1)).bomb === -1) {
            cell.bomb++;
        }
        if (document.getElementById('cell' + i + '-' + (t + 2)).bomb === -1) {
            cell.bomb++;
        }
        if (document.getElementById('cell' + (i + 1) + '-' + (t + 2)).bomb === -1) {
            cell.bomb++;
        }
        if (document.getElementById('cell' + (i + 2) + '-' + (t + 2)).bomb === -1) {
            cell.bomb++;
        }
        if (document.getElementById('cell' + (i + 2) + '-' + (t + 1)).bomb === -1) {
            cell.bomb++;
        }
        if (document.getElementById('cell' + (i + 2) + '-' + t).bomb === -1) {
            cell.bomb++;
        }
        if (document.getElementById('cell' + (i + 1) + '-' + t).bomb === -1) {
            cell.bomb++;
        }
        if (document.getElementById('cell' + i + '-' + t).bomb === -1) {
            cell.bomb++;
        }
    }
}

createMineField(8, 10);