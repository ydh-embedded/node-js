const express = require("express");
const app = express();


app.get('/', (request,response) => {
    response.send("Hallo Welt ! ")
})

app.listen(4040, () => {
    console.log('Web-Server läuft unter PORT 4040 ');
    
})