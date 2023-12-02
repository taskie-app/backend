const ProjectModel = require("../models/projectModel");

exports.createProject = async (req, res) => {
  const { user } = req;
  const { name, description } = req.body;

  const newProject = new ProjectModel({
    name,
    description,
    manager: user._id,
    members: [],
  });

  newProject
    .save()
    .then((project) => res.json({ project, error: null }))
    .catch((error) => res.json({ project: null, error }));
};

exports.getProjects = async (req, res) => {
  const { user } = req;

  ProjectModel.find({
    $or: [
      { manager: user._id },
      {
        members: {
          $in: [user._id],
        },
      },
    ],
  })
    .populate({
      path: "manager",
      select: "-password",
    })
    .populate({
      path: "members",
      select: "-password",
    })
    .exec()
    .then((projects) => res.json({ projects, error: null }))
    .catch((error) => res.json({ projects: null, error }));
};

exports.getProjectDetails = async (req, res) => {
  const { user } = req.body;
  const { id } = req.params;

  ProjectModel.findById(id)
    .then((project) => {
      const isManager = project.manager.id == user.id;
      const isMember = project.members
        .map((member) => member.id)
        .includes(user.id);
      if (!isManager && !isMember)
        return res.json({
          project: null,
          error: new Error("Cannot view this project"),
        });
      res.json({ project, error: null });
    })
    .catch((error) => res.json({ error }));
};

exports.updateProject = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const project = await ProjectModel.findById(id);
  const isManager = project.manager == user.id;
  if (!isManager)
    return res.json({
      error: new Error("Only manager can update this project"),
    });

  const { name, description, manager, members } = req.body;
  ProjectModel.findByIdAndUpdate(id, {
    name,
    description,
    manager,
    members,
  })
    .then((updatedProject) =>
      res.json({ project: updatedProject, error: null })
    )
    .catch((error) => res.json({ error }));
};

exports.deleteProject = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const project = await ProjectModel.findById(id);
  const isManager = project.manager == user.id;
  if (!isManager)
    return res.json({
      error: new Error("Only manager can update this project"),
    });

  ProjectModel.findByIdAndDelete(id)
    .then(() => res.json({ error: null }))
    .catch((error) => res.json({ error }));
};

exports.deleteAllProjects = async (req, res) => {
  ProjectModel.deleteMany({})
    .then(() => res.json({ error: null }))
    .catch((error) => res.json({ error }));
};

exports.addMembersToProject = async (req, res) => {
  const { user } = red;
  const { id } = req.params;
  const { members } = req.body;

  const project = await ProjectModel.findById(id);
  const isManager = project.manager == user.id;
  if (!isManager)
    return res.json({
      error: new Error("Only manager can update this project"),
    });

  ProjectModel.findByIdAndUpdate(id, {
    $push: {
      members,
    },
  })
    .then((project) => res.json({ project, error: null }))
    .catch((error) => res.json({ error }));
};
