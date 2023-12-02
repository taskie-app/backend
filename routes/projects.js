const express = require("express");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.post("/", projectController.createProject);
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectDetails);
router.get("/:projectId/tasks", taskController.getTasksByProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);
router.delete("/", projectController.deleteAllProjects);

// others routes

module.exports = router;
