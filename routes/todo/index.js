const express = require ('express')
const routes = express.Router()

// Controllers
const TodoController = require('../../controllers/todo.js/todo')

// Middleware


routes.get('/', 
    TodoController.Index
)

routes.post('/',
    TodoController.Create
)

routes.post('/:id',
    TodoController.Show
)

routes.put('/:id', 
    TodoController.Edit
)

routes.delete('/:id',
    TodoController.Delete
)
module.exports = routes