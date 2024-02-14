const readline = require ("readline") ;
const filesystem = require("fs")    ;

const rl =readline.createInterface({
    input:  process.stdin   ,
    output: process.stdout  ,
});


rl.question('Deine Lieblingsfarbe ist: ' , (input) => {
    filesystem.writeFile("antwort.txt" , input , (error) => {
        if (error) console.log(error);
        else console.log(filesystem.readFileSync("antwort.txt" , "utf8"));
    rl.close();
    });


});


