const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const ROUNDS = 10;
const JWT_SECRET = "jwt-secret";

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (user) {
      return res.json({ error: "Username has been used" });
    }

    const hashedPassword = await bcrypt.hash(password, ROUNDS);
    const newUser = new UserModel({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    const { password: _, ...rest } = newUser;

    const token = jwt.sign({ ...rest }, JWT_SECRET);
    res.cookie("jwt", token, { httpOnly: true });
    res.json({ error: null });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({ error: "User not existed" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.json({ error: "Invalid password" });
    }

    const { password: _, ...rest } = user;

    const token = jwt.sign({ ...rest }, JWT_SECRET);
    res.cookie("jwt", token, { httpOnly: true });
    res.json({ error: null });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

exports.signOut = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.json({ error: null });
  } catch (error) {
    res.json({ error });
  }
};

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies["jwt"];
  if (!token) return res.json({ error: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) return res.json({ error });
    req.user = user;
    next();
  });
};

exports.getUsers = async (req, res) => {
  const { username } = req.query;
  UserModel.find({ username }, "-password")
    .then((users) => res.json({ users, error: null }))
    .catch((error) => res.json({ users: null, error }));
};

exports.getAuthenticated = async (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) return res.json({ authenticated: false });

  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) return res.json({ authenticated: false });
    res.json({ authenticated: true });
  });
};
