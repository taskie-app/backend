const TaskModel = require("../models/taskModel");

exports.createTask = async (req, res) => {
  const {
    projectId,
    name,
    description,
    assignedTo = null,
    status = "TODO",
    dueDate = null,
    comments = [],
  } = req.body;

  const newTask = new TaskModel({
    projectId,
    name,
    description,
    assignedTo,
    status,
    dueDate,
    comments,
  });

  newTask
    .save()
    .then((task) => res.json({ task, error: null }))
    .catch((error) => res.json({ task: null, error }));
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json({ tasks, error: null });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

exports.getTasksByProject = async (req, res) => {
  const { projectId } = req.params;
  TaskModel.find({ projectId })
    .then((tasks) => res.json({ tasks, error: null }))
    .catch((error) => res.json({ tasks: null, error }));
};

exports.getTaksDetails = async (req, res) => {
  const { id } = req.params;
  TaskModel.findById(id)
    .then((task) => res.json({ task, error: null }))
    .catch((error) => res.json({ task: null, error }));
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { projectId, name, description, assignedTo, status, dueDate } =
    req.body;
  TaskModel.findByIdAndUpdate(id, {
    projectId,
    name,
    description,
    assignedTo,
    status,
    dueDate,
  })
    .then((task) => res.json({ task, error: null }))
    .catch((error) => res.json({ task: null, error }));
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  TaskModel.findByIdAndDelete(id)
    .then(() => res.json({ error }))
    .catch((error) => res.json({ error }));
};

exports.commentOnTask = async (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;

  TaskModel.findByIdAndUpdate(id, {
    $push: {
      comments: {
        author,
        content,
      },
    },
  })
    .then(() => res.json({ error: null }))
    .catch((error) => res.json({ error }));
};
