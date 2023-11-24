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
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user || password != user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Valid credentials" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};