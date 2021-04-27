require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Apiroutes = require('./routes')

//DB Config
mongoose.connect(process.env.DATABASE, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.Promise = global.Promise
mongoose.connection.on('error', (error) => {
    console.log("Error: ", error.message)
} )

//Middleware

const server = express()
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))

//Routes

server.use('/api', Apiroutes)

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})


