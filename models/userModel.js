const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: String,
=======
  username: String,
>>>>>>> origin/dev
  email: String,
  password: String,
});

const UserModel = mongoose.model("User", userSchema);

<<<<<<< HEAD
module.exports = UserModel;
=======
module.exports = UserModel;
>>>>>>> origin/dev
