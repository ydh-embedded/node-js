const readline = require ("readline") ;

const rl =readline.createInterface({
    input:  process.stdin   ,
    output: process.stdout  ,
});


rl.question('Deine Lieblingsfarbe ist: ' , (input) => {
    console.log('Meine Lieblingsfarbe ist ' + input );
    rl.close();
});


