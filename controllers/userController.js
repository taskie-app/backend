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
      return res.json({ error: "User already existed" });
    }

    const hashedPassword = await bcrypt.hash(password, ROUNDS);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};

exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ error: "User not existed" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};
