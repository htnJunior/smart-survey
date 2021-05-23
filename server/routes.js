const express = require('express')
const UserController = require('./controllers/UserController')
const SurveyController = require('./controllers/SurveyController')
const AuthController = require('./controllers/AuthController')
const router = express.Router()

const Auth = require('./middlewares/Auth')
const AuthValidator = require('./validators/AuthValidator')

//test route
router.get('/ping', (req, res, next) => {
    res.json({pong: true})
})

//Auth Routes
router.post('/auth/signin', AuthController.signin)
router.post('/auth/signup', AuthValidator.signup, AuthController.signup)
//User Routes
router.get('/user/me', Auth.private, UserController.info)
router.get('/user/surveys', Auth.private, UserController.surveys)
router.put('/user/me', Auth.private, UserController.edit)
//Survey Routes
router.get('/survey/item', SurveyController.getItem)
router.get('/survey/list', SurveyController.list)
router.post('/survey/add', Auth.private, SurveyController.addItem)
router.post('/survey/:id', Auth.private, SurveyController.edit)

module.exports = router