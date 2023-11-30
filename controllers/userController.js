const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const ROUNDS = 10;
const JWT_SECRET = "jwt-secret";

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log({ username, email, password });

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({ user: null, error: new Error("User already existed") });
    }

    const hashedPassword = await bcrypt.hash(password, ROUNDS);
    console.log(hashedPassword);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
    res.cookie("jwt", token, { httpOnly: true });
    res.json({ token, error: null });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ error: "User not existed" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
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
  } catch {
    res.json({ error });
  }
};

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies["jwt"];
  if (!token) return res.json({ error: new Error("Unauthorized") });

  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) return res.json({ error });
    req.user = user;
    next();
  });
};

exports.getUsers = async (req, res) => {
  const { email } = req.body;
  UserModel.find({ email }, "-password")
    .then((user) => res.json({ user, error: null }))
    .catch((error) => res.json({ user: null, error }));
};
