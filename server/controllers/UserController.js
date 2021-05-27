const User = require('../models/User')
const Survey = require('../models/Survey')
const { validationResult, matchedData } = require('express-validator')

module.exports = {
    info: async (req, res) => {
        let token = req.query.token
        const user = await User.findOne({token})
        const surveys = await Survey.find({idUser: user._id.toString()})

        let surveyList = []
        for(let i in surveys){
            surveyList.push({...surveys[i]})
        }
        res.json({
            name: user.name,
            email: user.email,
            surveys: surveyList
        })

    },
    surveys: async (req, res) => {

    },
    edit: async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.json({errors: errors.mapped()})
            return
        }
        const data = matchedData(req)

        const user = await User.findOne({token: data.token})
        let updates = {

        }
        if(data.name){
            updates.name = data.name
        }

        if(data.email){
            const emailCheck = await User.findOne({email: data.email})
            if(emailCheck){
                res.json({error: 'Email já cadastrado'})
                return
            }
            updates.email = data.email
        }

        await User.findOneAndUpdate({token: data.token}, {$set: updates})
        
        res.json({})
    }
}