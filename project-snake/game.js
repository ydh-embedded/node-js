'use strict';

let ansi = require('ansi');
let cursor = ansi(process.stdout);
let width = 40;
let height = 20;
let posX = 0;  // 🐍
let posY = 0;
let dirX = 1;
let dirY = 0;
let applePosX = 0;  // 🍎
let applePosY = 0;
let points = 0;
let speed = 3; // moves per second
let giraffe = null;

function rand_int(n) {
    return Math.random() * n | 0;
}

class Giraffe {
    constructor() {
        this.x = rand_int(width) + 0.1;
        this.y = rand_int(height) + 0.1;
        this.findApple();
        this.draw();
    }
    findApple() {
        this.dx = (this.x < applePosX) ? +0.32 : - 0.32;
        this.dy = (this.y < applePosY) ? +0.25 : - 0.25;
    }
    move() {
        cursor.goto(this.x, this.y).write(' ');
        this.x += this.dx;
        this.y += this.dy;
    }
    draw() {
        cursor.goto(this.x, this.y).write('🦒');
    }
    run() {
        this.findApple();
        this.move();
        this.draw();
        if (Math.round(this.x) == applePosX && Math.round(this.y) == applePosY) {
            points -= 1;
            speed += 0.25;
            drawPoint(applePosX, applePosY, " ");
            newApple();
        }
    }
}

function drawHorizontalLine(col, row, length) {
    for (let i = 0; i < length; i++) {
        cursor.goto(col + i, row).write(' ');
    }
}

function drawVerticalLine(col, row, length) {
    for (let i = 0; i < length; i++) {
        cursor.goto(col, row + i).write(' ');
    }
}

function removeSnake() {
    cursor.bg.black().write(" ");
    drawPoint(posX, posY);
    cursor.bg.reset();
}
function drawSnake() {

    //cursor.bg.green();
    //cursor.write("🐍");
    drawPoint(posX, posY, "🐍");
    cursor.write(" ");
    cursor.bg.reset();
}
function drawPoint(col, row, char = " ") {
    cursor.goto(col, row).write(char);
}
function setText(col, row, text) {
    cursor.goto(col, row).write(text);
}

function redrawApple() {
    //cursor.bg.red();
    drawPoint(applePosX, applePosY, "🍎");
    cursor.bg.reset();
    setText(1, height + 2, "Points: " + points.toString());
    setText(1, height + 3, "Speed: " + speed.toString());

}
function newApple() {
    applePosX = Math.ceil(Math.random() * (width - 2)) + 1;
    applePosY = Math.ceil(Math.random() * (height - 2)) + 1;
    redrawApple();
}

function quitGame() {
    cursor.reset();
    cursor.bg.reset();
    process.stderr.write('\x1B[?25h');
    cursor.goto(1, 10);
    process.exit();
}

function gameLoop() {

    // remove snake at old position
    removeSnake(posX, posY);

    // set new position
    posX = posX + dirX;
    posY = posY + dirY;

    // check new position
    if (posX == 1 || posX == width || posY == 1 || posY == height) {
        cursor.red();
        cursor.bg.white();
        setText(width / 2 - 6, height / 2, " GAME OVER ");
        quitGame();
    }

    // ensure Apple is there, even if other sprites overwrote parts of output (unicode char width)
    redrawApple();

    // draw snake at new position
    drawSnake();

    // check if apple is touched
    if (posX == applePosX && posY == applePosY) {
        // increase points
        points++;
        // increase speed
        if (speed < 20) {
            speed++;
        }
        // draw new apple
        newApple();
    }

    // handle giraffe    
    giraffe.run();

    // call gameLoop
    //console.log(
    setTimeout(gameLoop, 1000 / speed)
    //);
}

function handleInput(chunk, key) {
    //console.log("keypress", chunk, key);
    if (key.name == 'q') {
        quitGame();
    } else if (key.name == 'right') {
        dirX = 1;
        dirY = 0;
    } else if (key.name == 'left') {
        dirX = -1;
        dirY = 0;
    } else if (key.name == 'up') {
        dirX = 0;
        dirY = -1;
    } else if (key.name == 'down') {
        dirX = 0;
        dirY = 1;
    }
}
// https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin
function registerKeypress() {
    const readline = require('readline');

    readline.emitKeypressEvents(process.stdin);

    if (process.stdin.setRawMode != null) {
        process.stdin.setRawMode(true);
    }

    process.stdin.on('keypress', handleInput);
    //process.stdin.on('keypress', handleInput);
}

try {

    // clear output
    process.stdout.write('\x1Bc');
    // hide cursor
    process.stderr.write('\x1B[?25l')

    // draw game area
    cursor.bg.grey();
    drawHorizontalLine(1, 1, width);
    drawHorizontalLine(1, height, width);
    drawVerticalLine(1, 1, height);
    drawVerticalLine(width, 1, height);
    cursor.bg.reset();

    // handle key press events
    registerKeypress();

    // set initial p
    posX = Math.floor(width / 2);
    posY = Math.floor(height / 2);
    // draw first apple
    newApple();
    // init giraffe
    giraffe = new Giraffe();
    // start game loop
    gameLoop();

} catch (ex) {
    console.log(ex.toString());
} finally {
    //console.log("    quitGame();    ");
}