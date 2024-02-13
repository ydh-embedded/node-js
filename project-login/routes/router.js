const express   = require('express');
const router    = express.Router()  ;
const bcrypt    = require('bcryptjs')  ;
const jwt       = require('jsonwebtoken')     ;                      /* jsonwebToken erstellt einen sicherheitstoken */
const db        = require('../lib/server.js');               /*  wir legen hier den relativen Pfad an weil es nicht mit nodejs installiert wurde */
const userMiddleware  = require('../middleware/user.js');
const uuid      = require('uuid')   ;


/* Route für die Registrierung */
router.post('/sign-up' , userMiddleware.validateRegister , (request, response, next) => {} );

/* Route für das login */
router.post('/login' , userMiddleware.isLoggedIn , (request, response, next) => {

    db.query(                                                   // wir holen uns den Nutzernamen
    "SELECT * FROM `tbl_users` WHERE `users_name` = ? ;"  ,     // in der Tabelle tbl_users alles was users_name heißt
    [request.body.username] ,
    (error , result) => {
        if(error){
            return response.status(400).send({
                message: error ,
            });
        }
        if(!result.length){
            return response.status(400).send({
                message: "BN oder PW nicht korrekt!"
            });
        }
        bcrypt.compare(
            request.body.password,
            result[0]['users_password'],
            (bcryptERROR, bcryptRESULT) => {
                if(bcryptERROR){
                    return result.status(400).send({
                        message: "BN oder PW nicht korrekt!"
                    });
                }
                if(bcryptRESULT){
                    const token = jwt.sign(
                    {
                        username:   result[0].users_name  ,
                        userId:     result[0].users_id    ,
                    }   ,   "SECRETKEY"     ,
                    {
                        expiresIn: "7d"
                    }
                    );
                    db.query(
                        "UPDATE `tabl_users` SET `users_last_login` = now() WHERE id = ?;"   ,      // Zeitstempel hier mit now() realisiert
                        [result[0].users_id]
                    );
                    return result.status(200).send({
                        message: "Login erfolgreich "
                    });
                }
            }
        )
    }

    );


} );

/* Route für die geschützen Bereiche mit der get methode */
router.get('/secret-route',(request, response, next) => {
    response.send('Das ist ein geschützer Inhalt');});




module.exports = router ;                                       // sobald wir die module benutzen verwenden wir

