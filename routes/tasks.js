var express = require('express');
var router = express.Router();
var tasksCtrl = require('../controllers/tasksController')

/* GET users listing. */
router.get('/', tasksCtrl.getAll);
router.post('/:id/todos/',tasksCtrl.newTodos)
router.post('/new', tasksCtrl.create)
router.put('/:id/todosContent/:todosid', tasksCtrl.updateTodosContent)
router.put('/:id/todosStatus/:todosid', tasksCtrl.updateTodosStatus)
router.delete('/:id/removeTodos/:todosid', tasksCtrl.removeTodos)

module.exports = router;
