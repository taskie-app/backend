const TaskModel = require("../models/taskModel");

exports.createTask = async (req, res) => {
  const { projectId, title, description, assignedTo, status, dueDate } =
    req.body;

  try {
    const newTask = new TaskModel({
      projectId,
      title,
      description,
      assignedTo,
      status,
      dueDate,
    });
    await newTask.save();

    res
      .status(201)
      .json({ message: "Task created successfully", data: { task: newTask } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json({ data: { tasks } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTaksDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findById(id);
    res.json({ data: { task } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { projectId, title, description, assignedTo, status, dueDate } =
    req.body;
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, {
      projectId,
      title,
      description,
      assignedTo,
      status,
      dueDate,
    });
    res.json({
      message: "Task updated successfully",
      data: { task: updatedTask },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await TaskModel.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};