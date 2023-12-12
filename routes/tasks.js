const express = require("express");
const taskController = require("../controllers/taskController");
const commentController = require("../controllers/commentController");

const router = express.Router();

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskDetails);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

router.post("/:taskId/comments", commentController.createComment);
router.get("/:taskId/comments", commentController.getComments);
router.put("/:taskId/comments/:commentId", commentController.updateComment);
router.delete("/:taskId/comments/:commentId", commentController.deleteComment);

module.exports = router;
