const express = require("express");
const userController = require("../controllers/userController");
const { upload } = require("../middlewares/storage");

const router = express.Router();

router.post("/", userController.createUser);
router.post("/sign-in", userController.signIn);
router.post("/sign-out", userController.signOut);
router.put("/:id", upload.single("avatar"), userController.updateUser);
router.get("/", userController.getUsers);

module.exports = router;
