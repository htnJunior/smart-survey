const {checkSchema} = require('express-validator')

module.exports = {
    editAction: checkSchema ({
        token:{
            notEmpty:true,
        },
        name: {
            optional: true,
            trim: true,
            isLength: {
                options: {
                    min: 2
                }
            },
            errorMessage: 'Nome precisa ter pelo menos dois caracteres'
        },
        email: {
            optional: true,
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'Email inválido.'
        },
        passwd: {
            optional: true,
            isLength: {
                options: {
                    min: 6,
                }
            },
            errorMessage: 'Senha precisa ter no mínimo seis caracteres'
        }
    })
}