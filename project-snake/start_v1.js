'use strict';

let ansi = require('ansi');
let cursor = ansi(process.stdout);

try {
    cursor.bg.red()                ;                                            // cursor.bg.... setzt die Hintergrundfarbe, so können wir mit dem Leerzeichen farbige Flächen malen
    cursor.goto(5, 5).write(' ')   ;
    cursor.goto(6, 5).write(' ')   ;
    cursor.goto(7, 5).write(' ')   ;
    cursor.bg.reset()              ;                                          // mit reset setzt du die Hintergrundfarbe wieder zurück
    cursor.yellow()                ;                                            // cursor..... setzt die Textfarbe
    cursor.goto(9, 5).write('MY GAME');
    cursor.reset()                 ;
    cursor.bg.red()                ;
    cursor.goto(17, 5).write(' ')  ;
    cursor.goto(18, 5).write(' ')  ;
    cursor.goto(19, 5).write(' ')  ;
    cursor.bg.reset()              ;
} catch (ex){
    console.log(ex.toString());                                // hier werden Fehler erkannt und ausgegeben
} finally {
    quitGame();                                                 // zum Schluss müssen wir das Spiel beenden
}



function quitGame(){
    cursor.reset()     ;
    cursor.bg.reset()  ;
    cursor.goto(1, 10) ;
    process.exit()      ;
}