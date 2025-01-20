const User = require("../models/user");

// user login controller function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // check if password matches using bcryptjs
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // return jsonwebtoken and user information
    res.json({ token: user.generateAuthToken(), user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// user register controller function
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // create new user
    const newUser = new User({ name, email, password });
    await newUser.save();
    // return jsonwebtoken and user information
    res.json({ token: newUser.generateAuthToken(), user: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { login, register };
