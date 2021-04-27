const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    idUser: String,
    title: String,
    options: String,
    startDate: Date,
    endDate: Date,
    qtVotes: Number,
    status: String
})

const modelName = 'Survey'

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName]
}else{
    module.exports = mongoose.model(modelName, modelSchema)
}