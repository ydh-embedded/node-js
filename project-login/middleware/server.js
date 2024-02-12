const mySQL = require('mysql');                         // Das installierte module mysql legen wir als constante fest

const connection = mySQL.createConnection({             //erwartet die info für die verbindung

    host:process.env.DB_HOST,                          // das connection Object wird erzeugt
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PW,

});

connection.connect();                                   // baut die Verbindung auf


module.exports = connection;                            // Module benötigen die Anweisung, dasss diese exportiert werden müssen