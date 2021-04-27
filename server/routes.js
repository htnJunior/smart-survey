const express = require('express')
const UserController = require('./controllers/UserController')
const SurveyController = require('./controllers/SurveyController')
const AuthController = require('./controllers/AuthController')
const router = express.Router()

//test route
router.get('/ping', (req, res, next) => {
    res.json({pong: true})
})

//Auth Routes
router.post('/auth/signin', AuthController.signIn)
router.post('/auth/signup', AuthController.signUp)
//User Routes
router.get('/user/me', UserController.info)
router.get('/user/surveys', UserController.surveys)
router.put('/user/edit', UserController.edit)
//Survey Routes
router.get('/survey/item', SurveyController.getItem)
router.get('/survey/list', SurveyController.list)
router.post('/survey/add', SurveyController.addItem)
router.post('/survey/:id', SurveyController.edit)

module.exports = router