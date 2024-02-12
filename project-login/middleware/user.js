const jwt = require('jsonwebtoken');

module.exports = {                                              /* Registrieung validieren */

    validateRegister: (request, response, next) => {
        if(!request.body.username || request.body.username.length < 3){
            return response.status({
                message: 'Bitte geben Sie einen Nutzernamen mit min. 3 Zeichen ein'
            });
        }
    }
};