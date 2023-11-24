const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
