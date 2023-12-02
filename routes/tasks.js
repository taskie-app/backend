const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaksDetails);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

router.post("/:id/comments", taskController.commentOnTask);

module.exports = router;
