<<<<<<< HEAD
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const ROUNDS = 10;
const JWT_SECRET = "jwt-secret";

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already existed" });
    }
    const hashedPassword = await bcrypt.hash(password, ROUNDS);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
=======
const UserModel = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    // create new user
>>>>>>> origin/dev
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

<<<<<<< HEAD
exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.status(200).json({ message: "Valid credentials", token });
=======
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user || password != user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Valid credentials" });
>>>>>>> origin/dev
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};