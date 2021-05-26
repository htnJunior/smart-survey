const { checkSchema } = require('express-validator')

//Form validator
module.exports = {
    signup: checkSchema({
        name: {
            trim: true,
            notEmpty: true,
            isLength: {
                options: {
                    min: 2
                }
            },
            errorMessage: 'Nome precisa ter pelo menos dois caracteres'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            notEmpty: true,
            errorMessage: 'Email inválido.'
        },
        passwd: {
            notEmpty: true,
            isLength: {
                options: {
                    min: 6,
                }
            },
            errorMessage: 'Senha precisa ter no mínimo seis caracteres'
        }
    }),
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            notEmpty: true,
            errorMessage: 'Email Inválido'
        },
        passwd: {
            notEmpty: true,
            isLength: {
                options: {
                    min: 6,
                }
            },
            errorMessage: 'Senha precisa ter no mínimo seis caracteres'
        }
    })
}