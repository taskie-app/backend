const UserModel = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    // create new user
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // login user
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
