const express = require("express");
const projectController = require("../controllers/projectController");

const router = express.Router();

router.post("/", projectController.createProject);
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectDetails);
router.put("/:id", projectController.updateProject);

// others routes

module.exports = router;
