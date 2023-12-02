const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  projectId: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["TODO", "IN_PROGRESS", "DONE"],
    default: "TODO",
  },
  dueDate: Date,
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: String,
    },
  ],
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
