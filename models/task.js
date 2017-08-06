
const mongoose = require('mongoose')
var Schema = mongoose.Schema

var taskSchema = new Schema({
  title: {
    type: String
  },
  userID: { type: Schema.Types.ObjectId, ref: 'User'},
  todos: [{
    content: {
      type: String
    },
    complete: {
      type: Boolean,
      default: false
    }
  }],
  category: {
    type: String,
    default: 'Uncategorized'
  }
})

var Task = mongoose.model('Task', taskSchema)

module.exports = Task;
