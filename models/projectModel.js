const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  manager: {
    userId: mongoose.Schema.Types.ObjectId,
    username: String,
  },
  members: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      username: String,
      status: {
        type: String,
        enum: ["invited", "accepted"],
        default: "invited",
      },
    },
  ],
});

const ProjectModel = mongoose.model("Project", projectSchema);

module.exports = ProjectModel;
