var Task = require('../models/task')

var create = (req, res) => {
  let task = new Task({
    title: req.body.title,
    userID: req.body.userID,
    todos: [{ content: req.body.content }]
  })
  task.save()
  .then(task => {
    res.send(task)
  })
  .catch(err => res.status(500).send(err))
}

var newTodos = (req, res) => {
  console.log(req.params.id);
  Task.findByIdAndUpdate(req.params.id,
    {$push: {'todos' : {content: req.body.content}}},
    {new: true}
  )
  .then(updated => {
    res.send(updated)
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
}

var updateTodosContent = (req, res) => {
  Task.update(
    {'_id': req.params.id, 'todos._id' : req.params.todosid},
    {
      $set: {
        'todos.$.content': req.body.content
      }
    }
  )
  .then(updated => res.send(updated))
  .catch(err => res.status(500).send(err))
}

var updateTodosStatus = (req, res) => {
  Task.update(
    {'_id': req.params.id, 'todos._id' : req.params.todosid},
    {
      $set: {
        'todos.$.complete': req.body.complete
      }
    }
  )
  .then(updated => res.send(updated))
  .catch(err => res.status(500).send(err))
}

var removeTodos = (req, res) => {
  Task.update(
    {'_id': req.params.id},
    { $pull: { 'todos': {'_id': req.params.todosid}} },
    { safe: true}
  )
  .then(updated => res.send(updated))
  .catch(err => res.status(500).send(err))
}

var getAll = (req, res) => {
  Task.find({})
  .populate('userID', '_id name email')
  .exec()
  .then(tasks => res.send(tasks))
  .catch(err => res.status(500).send(err))
}

var getOne = (req, res) => {
  Task.find({ userID: req.params.userid })
  .then(task => res.send(task))
  .catch(err => res.status(500).send(err))
}

var remove = (req, res) => {
  Task.findByIdAndRemove(req.params.id)
  .then(removed => res.send(removed))
  .catch(err => res.status(500).send(err))
}

var update = (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updated => res.send(updated))
  .catch(err => res.status(500).send(err))
}

module.exports = {
  create,
  getAll,
  getOne,
  newTodos,
  updateTodosContent,
  updateTodosStatus,
  removeTodos,
  remove
};
