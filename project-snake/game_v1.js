'use strict';

//#region variablen

let ansi = require('ansi');
let cursor = ansi(process.stdout);

let width = 40;
let height = 20;

let posX = 0;       // Wir initialisieren die Position der Maus / grünen Punkt / Snake
let posY = 0;
let dirX = 1;
let dirY = 0;


let applePosX = 0;  // Wir initialisieren die Position vom Apfel
let applePosY = 0;

let points  = 0;
let speed   = 3;    // moves per second

//#endregion
//#region functionen

function drawHorizontalLine(col, row, length){
    for (let i = 0; i < length; i++){
        cursor.goto(col + i, row).write(' ');
    }
}

function drawVerticalLine(col, row, length){
    for (let i = 0; i < length; i++) {
        cursor.goto(col, row + i).write(' ');
    }
}

function quitGame(){
    cursor.reset()      ;
    cursor.bg.reset()   ;

    process.stderr.write('\x1B[?25h');

    cursor.goto(1, 10)  ;
    process.exit()      ;
}

function gameLoop(){

    removeSnake(posX, posY) ;                // remove snake at old position

        posX = posX + dirX      ;                 // set new position
        posY = posY + dirY      ;

    if (posX == 1 || posX == width || posY == 1 || posY == height) {     // check new position

        cursor.red()        ;
        cursor.bg.white()   ;
        setText(width / 2 - 6, height / 2, " GAME OVER ");
        quitGame();
    }

    drawSnake()             ;                  // draw snake at new position
    setTimeout(gameLoop, 500);                      // call gameLoop
}

function removeSnake(){
    cursor.bg.black()       ;
    drawPoint(posX, posY)   ;
    cursor.bg.reset()       ;
}

function drawSnake(){
    cursor.bg.green()       ;
    drawPoint(posX, posY)   ;
    cursor.bg.reset()       ;
}

function drawPoint(col, row, char){
    cursor.goto(col, row).write(' ');
}

function setText(col, row, text){
    cursor.goto(col, row).write(text);
}

function handleInput(chunk, key){

    if (key.name == 'q'){
        quitGame();
    } else if (key.name == 'right'){
        dirX =  1;
        dirY =  0;
    } else if (key.name == 'left'){
        dirX = -1;
        dirY =  0;
    } else if (key.name == 'up'){
        dirX =  0;
        dirY = -1;
    } else if (key.name == 'down'){
        dirX =  0;
        dirY =  1;
    }
}

function drawApple(){
    applePosX = Math.ceil(Math.random() * (width - 2)) + 1;
    applePosY = Math.ceil(Math.random() * (height - 2)) + 1;

    cursor.bg.red();

    drawPoint(applePosX, applePosY);
    cursor.bg.reset();

    setText(1, height + 2, "Points: " + points.toString());
    setText(1, height + 3, "Speed: " + speed.toString());
}

//#endregion
//#region try and catch



try {

    process.stdin.on('keypress', handleInput);  //Um die Schlange mit den Cursortasten steuern zu können


    process.stdout.write('\x1Bc')           ;    // clear output
    process.stderr.write('\x1B[?25l')       ;    // hide cursor

    cursor.bg.grey()                        ;    // draw game area
    drawHorizontalLine(1, 1, width)         ;
    drawHorizontalLine(1, height, width)    ;
    drawVerticalLine(1, 1, height)          ;
    drawVerticalLine(width, 1, height)      ;
    cursor.bg.reset();
    
    posX = Math.floor(width / 2)            ;    // set initial position of snake
    posY = Math.floor(height / 2)           ;


    
    drawApple();                                        // draw first apple

    if (posX == applePosX && posY == applePosY){      // check if apple is touched
        points++;                                    // increase points

        if (speed < 20){
            speed++;                                 // increase speed
        }

        drawApple();                                 // draw new apple
    }




    drawSnake();                                      // draw snake at new position
    gameLoop();                                      // start game loop
    setTimeout(gameLoop, 1000 / speed);             // dass wir die starre Zeit von 500ms durch eine dynamische Zeitangeb ersetzen

} catch (ex){
    console.log(ex.toString());
} finally {
    quitGame();
}
//#endregion