require('dotenv').config;

const express   = require('express');
const cors       = require('cors');
const PORT      = process.env.PORT || 3000;
const router    = require('./routes/router.js');
const app       = express();

    app.use('/api' , router)    ;
    app.use(express.json())     ;
    app.use(cors())             ;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/* Route für den start */
app.get('/' , (request, response, ) => {
    response.send('läuft');
} );
