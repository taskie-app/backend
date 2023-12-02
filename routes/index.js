var express = require("express");
const userController = require("../controllers/userController");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/authenticated", userController.getAuthenticated);

module.exports = router;
