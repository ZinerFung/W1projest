const unitLength = 20;
let boxColor = 150;
const strokeColor = 50;
let columns;
let rows;

let currentBoard;
let nextBoard;

let currentPoint = [0, 0]

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        currentBoard[currentPoint[0]][currentPoint[1]] = 0;
        let x = currentPoint[0] === 0 ? columns - 1 : currentPoint[0] - 1;
        currentPoint = [x, currentPoint[1]];
    } else if (keyCode === RIGHT_ARROW) {
        currentBoard[currentPoint[0]][currentPoint[1]] = 0;
        let x = currentPoint[0] === columns - 1 ? 0 : currentPoint[0] + 1;
        currentPoint = [x, currentPoint[1]];

        
    } else if (keyCode === UP_ARROW) {
        currentBoard[currentPoint[0]][currentPoint[1]] = 0;
        let y = currentPoint[1] === 0 ? rows - 1 : currentPoint[1] - 1;
        currentPoint = [currentPoint[0], y];
    } else if (keyCode === DOWN_ARROW) {
        currentBoard[currentPoint[0]][currentPoint[1]] = 0;
        let y = currentPoint[1] === rows - 1 ? 0 : currentPoint[1] + 1;
        currentPoint = [currentPoint[0], y];
    }
    currentBoard[currentPoint[0]][currentPoint[1]] = 2;
    loop();
}

function setup() {

    const canvas = createCanvas(windowWidth - 200, windowHeight - 200);
    canvas.parent(document.querySelector("#canvas"));


    columns = floor(width / unitLength);
    rows = floor(height / unitLength);


    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = [];


    }

    init();
}

function windowResized() {
    resizeCanvas(windowWidth - 200, windowHeight - 200);
}



function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {

            // currentBoard[i][j] = random() > 0.8 ? 1 : 0;
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;
        }
    }

    currentBoard[currentPoint[0]][currentPoint[1]] = 2
    // nextBoard[0][0] = 2;
    // currentBoard[0][3] = 1
    // currentBoard[1][3] = 1
    // currentBoard[2][3] = 1
    // currentBoard[2][2] = 1
    // currentBoard[1][1] = 1

}


function draw() {
    background(255);
    generate();

    // fill(tinycolor(boxColor).darken(20).toString());
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1) {
                if (nextBoard[i][j] == 1) {
                    // fill(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256))
                    fill(tinycolor(boxColor).darken(20).toString());
                } else
                    fill(boxColor);
            } else if (currentBoard[i][j] == 2) {
                fill("#FF0000");
            } else {
                fill(255);
            }
            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
        }
    }

}

let neighborsOne = 2
let neighborsTwo = 3
let neighborsThree = 3



function generate() {

    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {

            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {

                        continue;
                    }

                    neighbors +=
                        currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }

            // die of lonlineesss
            if (currentBoard[x][y] == 1 && neighbors < neighborsOne) {

                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > neighborsTwo) {
                // die of overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == neighborsThree) {
                //production
                nextBoard[x][y] = 1;
            } else {
                // no change
                nextBoard[x][y] = currentBoard[x][y];

            }
        }
    }

    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}


function mouseDragged() {

    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }

    const x = Math.floor(mouseX / unitLength);

    const y = Math.floor(mouseY / unitLength);
    // console.log(mouseX, mouseY, x, y)
    currentBoard[x][y] = 1;
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

function mousePressed() {
    noLoop();
    mouseDragged();
}



document.querySelector("#reset-game").addEventListener("click", function () {
    init();
    redraw();
});

document.querySelector("#silider").addEventListener("change", function (e) {

    const value = parseInt(this.value)
    frameRate(value)
})

document.querySelector("#start").addEventListener("click", function (e) {
    console.log(e.target.value)
    loop()
})

document.querySelector("#stop").addEventListener("click", function (e) {
    console.log(e.target.value)
    noLoop()
})

document.querySelector(".darkMode").addEventListener("click", function (e) {
    document.body.classList.toggle("darkMode")
    // console.log(e.target.value)
})
// 
document.querySelector("#changeColor").addEventListener("input", function (e) {
    console.log(e.target.value)
    boxColor = e.target.value
})

document.querySelector("#neighborsOne").addEventListener("click", function (e) {
    const value = document.querySelector("#neighborsOneValue").value
    console.log(typeof value, value);
    neighborsOne = Number(value);
});

document.querySelector("#neighborsTwo").addEventListener("click", function (e) {
    const value = document.querySelector("#neighborsTwoValue").value
    console.log(value);
    neighborsTwo = Number(value);
});

document.querySelector("#neighborsThree").addEventListener("click", function (e) {
    const value = document.querySelector("#neighborsThreeValue").value
    console.log(value);
    neighborsThree = Number(value);
});

document.querySelector("#random").addEventListener("click", function (e) {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = random() > 0.8 ? 1 : 0;
            nextBoard[i][j] = 0;
        }
    }

    redraw()
})

