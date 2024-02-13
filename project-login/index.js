require('dotenv').config;

const express   = require('express');
const cors      = require('cors');
const PORT      = process.env.PORT || 4004;
const router    = require('./routes/router.js');
const app       = express();

    app.use('/api' , router)    ;
    app.use(express.json())     ;
    app.use(cors())             ;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Zum Testen geben wir den Text aus
// app.get('/' , (request, response, ) => {                  //Route für den start
//     response.send('läuft');
// } );
//


app.use(express.static('public'));

