
const mongoose = require('mongoose')
var Schema = mongoose.Schema

var taskSchema = new Schema({
  title: {
    type: String
  },
  user: { type: Schema.Types.ObjectId, ref: 'User'}
  tasklist: [{
    content: {
      type: String
    },
    complete: {
      type: false
    }
  }],
  category: {
    type: String,
    default: 'Uncategorized'
  }
})

var Task = mongoose.model('Task', taskSchema)

module.exports = Task;
