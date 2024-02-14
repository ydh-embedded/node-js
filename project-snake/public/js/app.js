const express = require("express");
const app = express();
app.use(express.static("public"));
app.listen(4040, () => {
    console.log('Web-Server läuft unter PORT 4040 ');
    
})