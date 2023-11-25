const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
});

const ProjectModel = mongoose.model("Project", projectSchema);

module.exports = ProjectModel;
