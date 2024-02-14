'use strict';

const ansi = require('ansi');
const cursor = ansi(process.stdout);

const width = 40;
const height = 20;

let positionX = 0;
let positionY = 0;
let directionX = 1;
let directionY = 0;

let applePositionX = 0;
let applePositionY = 0;

let points = 0;
let speed = 3;

function drawHorizontalLine(column, row, length) {
  for (let i = 0; i < length; i++) {
    cursor.goto(column + i, row).write(' ');
  }
}

function drawVerticalLine(column, row, length) {
  for (let i = 0; i < length; i++) {
    cursor.goto(column, row + i).write(' ');
  }
}

function quitGame() {
  cursor.reset();
  cursor.bg.reset();

  process.stderr.write('\x1B[?25h');

  cursor.goto(1, 10);
  process.exit();
}

function gameLoop() {
  removeSnake(positionX, positionY);

  positionX += directionX;
  positionY += directionY;

  if (positionX === 1 || positionX === width || positionY === 1 || positionY === height) {
    cursor.red();
    cursor.bg.white();
    setText(width / 2 - 6, height / 2, " GAME OVER ");
    quitGame();
  }

  drawSnake();
  setTimeout(gameLoop, 500);
}

function removeSnake() {
  cursor.bg.black();
  drawPoint(positionX, positionY);
  cursor.bg.reset();
}

function drawSnake() {
  cursor.bg.green();
  drawPoint(positionX, positionY);
  cursor.bg.reset();
}

function drawPoint(column, row, character) {
  cursor.goto(column, row).write(' ');
}

function setText(column, row, text) {
  cursor.goto(column, row).write(text);
}

function handleInput(key) {
  if (key.name === 'q') {
    quitGame();
  } else if (key.name === 'right') {
    directionX = 1;
    directionY = 0;
  } else if (key.name === 'left') {
    directionX = -1;
    directionY = 0;
  } else if (key.name === 'up') {
    directionX = 0;
    directionY = -1;
  } else if (key.name === 'down') {
    directionX = 0;
    directionY = 1;
  }
}

function generateRandomApplePosition() {
  applePositionX = Math.floor(Math.random() * width) + 1;
  applePositionY = Math.floor(Math.random() * height) + 1;
}

generateRandomApplePosition();

function checkCollision() {
  if (positionX === applePositionX && positionY === applePositionY){
    console.log('Snake are broken');
  }
}