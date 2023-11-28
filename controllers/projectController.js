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

exports.getProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find();
        res.json({ data: { projects } });
    } catch (error) {
        console.error(error);
        res.json({ error });
    }
};

exports.getProjectDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await ProjectModel.findById(id);
        res.json({ data: { project } });
    } catch (error) {
        console.error(error);
        res.json({ error });
    }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, description, manager, members } = req.body;

    try {
        const updatedProject = await ProjectModel.findByIdAndUpdate(id, {
            name,
            description,
            manager,
            members,
        });

        res.json({ data: { project: updatedProject } });
    } catch (error) {
        console.error(error);
        res.json({ error });
    }
};

exports.deleteProject = async (req, res) => { };

exports.inviteUserToProject = async (req, res) => { };
