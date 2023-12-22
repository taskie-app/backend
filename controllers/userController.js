const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const ROUNDS = 10;
const JWT_SECRET = "jwt-secret";

exports.createUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.json({ error: "Username has been used" });
    }

    const hashedPassword = await bcrypt.hash(password, ROUNDS);
    const newUser = new UserModel({
      name,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    const userData = extractUserData(newUser);
    setJwtCookie(res, userData);
    res.json({ user: userData, error: null });
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

    const userData = extractUserData(user);
    setJwtCookie(res, userData);
    res.json({ user: userData, error: null });
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
    res.json({ error: error.message });
  }
};

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies["jwt"];
  if (!token) return res.json({ error: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (error, data) => {
    if (error) return res.json({ error });
    req.user = data.user;
    next();
  });
};

exports.getUsers = async (req, res) => {
  const { username } = req.query;
  if (!username || username == "") return res.json({ users: [], error: null });
  UserModel.find({ username: { $regex: username, $options: "i" } }, "-password")
    .then((users) => res.json({ users, error: null }))
    .catch((error) => res.json({ users: null, error }));
};

exports.getAuthenticated = async (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) return res.json({ authenticated: false });

  jwt.verify(token, JWT_SECRET, (error, data) => {
    if (error) return res.json({ authenticated: false });
    res.json({ authenticated: true, user: data.user });
  });
};

exports.updateUser = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  if (user._id != id)
    return res.json({ error: "You can only change your profile" });
  const { name, username, avatar_url } = req.body;

  // UserModel.findOne({ username })
  //   .then((user) => {
  //     if (user) res.json({ error: "Username has been used" });
  //   })
  //   .catch((error) => res.json({ error: error.message }));

  UserModel.findByIdAndUpdate(id, {
    name,
    username,
    avatar_url,
  })
    .then((user) => {
      const userData = extractUserData(user);
      setJwtCookie(res, userData);
      res.json({ user: userData, error: null });
    })
    .catch((error) => res.json({ error: error.message }));
};

function setJwtCookie(res, userData) {
  const token = jwt.sign({ user: userData }, JWT_SECRET);
  res.cookie("jwt", token, { httpOnly: true, sameSite: "None", secure: true });
}

function clearJwtCookie() {}

function extractUserData(user) {
  return {
    _id: user._id,
    name: user.name,
    username: user.username,
    avatar_url: user.avatar_url,
  };
  s;
}
