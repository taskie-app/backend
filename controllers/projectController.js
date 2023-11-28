const ProjectModel = require("../models/projectModel");

exports.createProject = async (req, res) => {
    const { name, description, manager, members } = req.body;

    try {
        const newProject = new ProjectModel({
            name,
            description,
            manager,
            members,
        });
        await newProject.save();

        res.status(201).json({ data: { project: newProject } });
    } catch (error) {
        console.error(error);
        res.json({ error });
    }
};

exports.getProjects = async (req, res) => { };

exports.getProjectDetails = async (req, res) => { };

exports.updateProject = async (req, res) => { };

exports.deleteProject = async (req, res) => { };

exports.inviteUserToProject = async (req, res) => { };
