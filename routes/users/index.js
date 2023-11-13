const express = require('express')
const routes = express.Router()

//Controllers
const Authcontroller = require('../../controllers/auth/auth.js')

//Middleware
const AuthMiddleware = require('../../middlewares/auth/validation.js')

routes.get('/', (req, res, next) => {
    res.send('here Api for user')
})

routes.post('/register',[
    AuthMiddleware.validationRegister
], Authcontroller.RegisterDB)

routes.post('/login',[
    AuthMiddleware.validationLogin
], Authcontroller.LoginDB)


module.exports = routes