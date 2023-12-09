const TaskModel = require("../models/taskModel");

exports.createTask = async (req, res) => {
  const {
    projectId,
    name,
    description = "",
    assignedTo = null,
    status,
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
  const { user } = req;
  const { projectId } = req.query;
  if (projectId) {
    TaskModel.find({ projectId })
      .populate({
        path: "assignedTo",
        select: "-password",
      })
      .exec()
      .then((tasks) => res.json({ tasks, error: null }))
      .catch((error) => res.json({ tasks: null, error: error.message }));
  } else {
    console.log(user._id);
    TaskModel.find({ assignedTo: user._id })
      .populate({
        path: "assignedTo",
        select: "-password",
      })
      .exec()
      .then((tasks) => res.json({ tasks, error: null }))
      .catch((error) => res.json({ tasks: null, error: error.message }));
  }
};

exports.getTaskDetails = async (req, res) => {
  const { id } = req.params;
  TaskModel.findById(id)
    .populate({
      path: "assignedTo",
      select: "-password",
    })
    .exec()
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
    assignedTo: assignedTo?._id,
    status,
    dueDate,
  })
    .then((task) => res.json({ task, error: null }))
    .catch((error) => res.json({ task: null, error }));
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  TaskModel.findByIdAndDelete(id)
    .then(() => res.json({ error: null }))
    .catch((error) => res.json({ error: error.message }));
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
