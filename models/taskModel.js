const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  projectId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  assignedTo: {
    userId: mongoose.Schema.Types.ObjectId,
    username: String,
  },
  status: String,
  dueDate: Date,
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;