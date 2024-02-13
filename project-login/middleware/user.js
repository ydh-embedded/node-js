const jwt = require('jsonwebtoken');

module.exports = {                                                              /* Registrieung validieren */

    validateRegister: (request, response, next) => {
        if(!request.body.username || request.body.username.length < 3){
            return response.status({
                message: 'Bitte geben Sie einen Nutzernamen mit min. 3 Zeichen ein'
            });
        }
    }   ,

    isLoggedIn: (request,result,next) => {

        if(!request.headers.authorization){
            return result.status(400).send({
                message: "Nicht eingelogged"
            });
        }

        try {
            const authHeader    = request.headers.authorization;                // wir lesen den Autorisation Header aus
            const token         = authHeader.split(" ")[1];                     // wir splitten am Leerzeichen
            const decoded       = jwt.verify(token, "SECRETKEY");               // wir überprüfen den token mit dem secretkey
            request.userData    = decoded;
            next();
        }
        catch(error){
            return result.status(400).send({
                message: "Login nicht korrekt!"
            })
        }
    }



};