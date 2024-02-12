const express   = require('express');
const router    = express.Router()  ;
const bcrypt    = require('bcryptjs')  ;
const uuid      = require('uuid')   ;
const jwt       = require('jsonwebtoken')     ;                      /* jsonwebToken */
const db        = require('../middleware/server.js');               /*  wir legen hier den relativen Pfad an weil es nicht mit nodejs installiert wurde */
const userMW    = require('../middleware/user.js');



/* Route für die Registrierung */
router.post('/sign-up' , (request, response, next) => {} );
/* Route für das login */
router.post('/login' , (request, response, next) => {} );
/* Route für die geschützen Bereiche mit der get methode */
router.get('/secret-route',(request, response, next) => {
    response.send('Das ist ein geschützer Inhalt');});

module.exports = router ;                                       // sobald wir die module benutzen verwenden wir

