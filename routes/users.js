const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();
<<<<<<< HEAD
=======

router.post("/", userController.createUser);
>>>>>>> origin/dev

router.post("/", userController.createUser);
router.post("/sign-in", userController.signInUser);

module.exports = router;