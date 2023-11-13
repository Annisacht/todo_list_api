const express = require('express')
const routes = express.Router()

//routes
const TodoRoutes = require('./todo/index')
const UserRoutes = require('./users/index')

routes.get('/', function(req, res, next) { res.send('this is routes from apiRoutes') })
routes.use('/todo', TodoRoutes)
routes.use('/users', UserRoutes)

module.exports = routes