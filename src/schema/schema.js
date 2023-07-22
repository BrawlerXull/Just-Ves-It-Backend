const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  description: {
    required: true,
    type: String,
  },
  subject: {
    required:true,
    type: String,
  },
  date: {
    required:true,
    type: Date,
  }


});

module.exports = mongoose.model("Task", TaskSchema);