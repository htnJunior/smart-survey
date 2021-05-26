const { validationResult, matchedData} = require('express-validator')
const bcrypt = require('bcrypt')
//const mongoose = require('mongoose')

const User = require('../models/User')

module.exports = {
    signin: async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json({ error: errors.mapped()})
            return
        }
        const data = matchedData(req)

        const user = await User.findOne({ email: data.email})

        if(!user){
            res.json({error: 'Email e/ou senha inválido'})
            return
        }
        const match = await bcrypt.compare(data.passwd, user.passwd)
        if(!match){
            res.json({error: 'Email e/ou senha inválido'})
            return
        }

        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)

        user.token = token
        await user.save()

        res.json({token, email: data.email})

    },
    signup: async (req, res) => {
        const errors =  validationResult(req)
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()})
            return
        }
        const data = matchedData(req)

        const user = await User.findOne({
            email: data.email
        })

        if(user){
            res.json({
                error: {
                    email: {
                        msg: 'E-mail já cadastrado'
                    }
                }
            })
            return
        }

        const passwdHash = await bcrypt.hash(data.passwd, 10)
        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)

        const newUser = new User({
            name: data.name,
            email: data.email,
            passwd: passwdHash,
            token
        })

        await newUser.save()
        res.json({token})

    }
}