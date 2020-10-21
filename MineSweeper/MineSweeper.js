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
            cell.style.fontSize = "10px";
            cell.style.fontFamily = 'retro';
            cell.style.textAlign = "center";
            cell.reveal = false;
            cellArray.push(cell);
        }
    }
    cellArray.forEach(function(elem) {
        elem.addEventListener("mouseover", function() {
            if (elem.reveal === false) {
                elem.style.borderTop = "solid 1px grey";
                elem.style.borderLeft = "solid 1px grey";
                elem.style.borderBottom = "solid 1px lightgrey";
                elem.style.borderRight = "solid 1px lightgrey";
            }
        });
        elem.addEventListener("mouseout", function() {
            if (elem.reveal === false) {
                elem.style.borderTop = "solid 1px white";
                elem.style.borderLeft = "solid 1px white";
                elem.style.borderBottom = "solid 1px grey";
                elem.style.borderRight = "solid 1px grey";
            }
        });
        elem.addEventListener("mousedown", function() {
            if (localStorage.getItem('gameStart') != 'true') {
                localStorage.setItem('gameStart', 'false');
                gameStart(elem, rows, columns, cell.x, cell.y);
            } else {
                clickField(elem, rows, columns);
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
                tempCell.bomb = 0;
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

                if (tempCell.bomb === 1) {
                    tempCell.style.color = "green";
                } else if (tempCell.bomb === 2) {
                    tempCell.style.color = "blue";
                } else if (tempCell.bomb === 3) {
                    tempCell.style.color = "orange";
                } else if (tempCell.bomb === 4) {
                    tempCell.style.color = "orange";
                } else if (tempCell.bomb === 5) {
                    tempCell.style.color = "darkorange";
                } else if (tempCell.bomb >= 6) {
                    tempCell.style.color = "red";
                }
            }
        }

        if (cell.bomb !== 0) {
            gameStart(cell, rows, columns, x, y);
        }
    }
    clickField(cell, rows, columns);
    localStorage.setItem('gameStart', 'true');
}

function clickField(cell, rows, columns) {
    cell.style.backgroundColor = "ligthgrey";
    cell.style.borderTop = "solid 1px grey";
    cell.style.borderLeft = "solid 1px grey";
    cell.style.borderBottom = "solid 1px lightgrey";
    cell.style.borderRight = "solid 1px lightgrey";
    cell.reveal = true;
    var zeroCount = [];
    if (cell.bomb !== -1) {
        var cellThis = document.getElementById('cell' + (cell.y - 1) + '-' + ((cell.x - 1) + 1));
        if ((cell.y - 1) !== 0 && cellThis.bomb !== -1 && cellThis.reveal !== true) {
            if (cellThis.bomb === 0) {
                zeroCount.push(cellThis);
            } else {
                cellThis.style.backgroundColor = "lightgrey";
                cellThis.style.borderTop = "solid 1px grey";
                cellThis.style.borderLeft = "solid 1px grey";
                cellThis.style.borderBottom = "solid 1px lightgrey";
                cellThis.style.borderRight = "solid 1px lightgrey";
                cellThis.reveal = true;
                cellThis.innerText = cellThis.bomb;
            }
        }

        var cellThis = document.getElementById('cell' + (cell.y - 1)+ '-' + ((cell.x - 1) + 2));
        if ((cell.y - 1)!== 0 && ((cell.x - 1) + 1) !== columns && cellThis.bomb !== -1 && cellThis.reveal !== true) {
            if (cellThis.bomb === 0) {
                zeroCount.push(cellThis);
            } else {
                cellThis.style.backgroundColor = "lightgrey";
                cellThis.style.borderTop = "solid 1px grey";
                cellThis.style.borderLeft = "solid 1px grey";
                cellThis.style.borderBottom = "solid 1px lightgrey";
                cellThis.style.borderRight = "solid 1px lightgrey";
                cellThis.reveal = true;
                cellThis.innerText = cellThis.bomb;
            }
        }

        var cellThis = document.getElementById('cell' + ((cell.y - 1)+ 1) + '-' + ((cell.x - 1) + 2));
        if (((cell.x - 1) + 1) !== columns && cellThis.bomb !== -1 && cellThis.reveal !== true) {
            if (cellThis.bomb === 0) {
                zeroCount.push(cellThis);
            } else {
                cellThis.style.backgroundColor = "lightgrey";
                cellThis.style.borderTop = "solid 1px grey";
                cellThis.style.borderLeft = "solid 1px grey";
                cellThis.style.borderBottom = "solid 1px lightgrey";
                cellThis.style.borderRight = "solid 1px lightgrey";
                cellThis.reveal = true;
            }
        }

        var cellThis = document.getElementById('cell' + ((cell.y - 1)+ 2) + '-' + ((cell.x - 1) + 2));
        if (((cell.y - 1)+ 1) !== rows && ((cell.x - 1) + 1) !== columns && cellThis.bomb !== -1 && cellThis.reveal !== true) {
            if (cellThis.bomb === 0) {
                zeroCount.push(cellThis);
            } else {
                cellThis.style.backgroundColor = "lightgrey";
                cellThis.style.borderTop = "solid 1px grey";
                cellThis.style.borderLeft = "solid 1px grey";
                cellThis.style.borderBottom = "solid 1px lightgrey";
                cellThis.style.borderRight = "solid 1px lightgrey";
                cellThis.reveal = true;
                cellThis.innerText = cellThis.bomb;
            }
        }

        var cellThis = document.getElementById('cell' + ((cell.y - 1)+ 2) + '-' + ((cell.x - 1) + 1));
        if (((cell.y - 1)+ 1) !== rows && cellThis.bomb !== -1 && cellThis.reveal !== true) {
            if (cellThis.bomb === 0) {
                zeroCount.push(cellThis);
            } else {
                cellThis.style.backgroundColor = "lightgrey";
                cellThis.style.borderTop = "solid 1px grey";
                cellThis.style.borderLeft = "solid 1px grey";
                cellThis.style.borderBottom = "solid 1px lightgrey";
                cellThis.style.borderRight = "solid 1px lightgrey";
                cellThis.reveal = true;
                cellThis.innerText = cellThis.bomb;
            }
        }

        var cellThis = document.getElementById('cell' + ((cell.y - 1)+ 2) + '-' + (cell.x - 1));
        if (((cell.y - 1)+ 1) !== rows && (cell.x - 1) !== 0 && cellThis.bomb !== -1 && cellThis.reveal !== true) {
            if (cellThis.bomb === 0) {
                zeroCount.push(cellThis);
            } else {
                cellThis.style.backgroundColor = "lightgrey";
                cellThis.style.borderTop = "solid 1px grey";
                cellThis.style.borderLeft = "solid 1px grey";
                cellThis.style.borderBottom = "solid 1px lightgrey";
                cellThis.style.borderRight = "solid 1px lightgrey";
                cellThis.reveal = true;
                cellThis.innerText = cellThis.bomb;
            }
        }

        var cellThis = document.getElementById('cell' + ((cell.y - 1)+ 1) + '-' + (cell.x - 1));
        if ((cell.x - 1) !== 0 && cellThis.bomb !== -1 && cellThis.reveal !== true) {
            if (cellThis.bomb === 0) {
                zeroCount.push(cellThis);
            } else {
                cellThis.style.backgroundColor = "lightgrey";
                cellThis.style.borderTop = "solid 1px grey";
                cellThis.style.borderLeft = "solid 1px grey";
                cellThis.style.borderBottom = "solid 1px lightgrey";
                cellThis.style.borderRight = "solid 1px lightgrey";
                cellThis.reveal = true;
                cellThis.innerText = cellThis.bomb;
            }
        }

        var cellThis = document.getElementById('cell' + (cell.y - 1)+ '-' + (cell.x - 1));
        if ((cell.y - 1)!== 0 && (cell.x - 1) !== 0 && cellThis.bomb !== -1 && cellThis.reveal !== true) {
            if (cellThis.bomb === 0) {
                zeroCount.push(cellThis);
            } else {
                cellThis.style.borderTop = "solid 1px grey";
                cellThis.style.borderLeft = "solid 1px grey";
                cellThis.style.borderBottom = "solid 1px lightgrey";
                cellThis.style.borderRight = "solid 1px lightgrey";
                cellThis.reveal = true;
                cellThis.innerText = cellThis.bomb;
            }
        }
    }
    for (var i = 0; i < zeroCount.length; i++) {
        clickField(zeroCount[i], rows, columns);
    }
}

createMineField(8, 10);