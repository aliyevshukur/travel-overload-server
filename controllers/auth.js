const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user-model.js");
const { name } = require("ejs");

// Register a new user
const register = async (req, res, next) => {
  const { name, surname, email, password } = req.body;

  try {
    const isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) {
      return res
        .status(409)
        .json({ ok: false, message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, surname, email, password: hashedPassword });
    await user.save();
    res.json({ ok: true, message: "success" });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    });
    res.json({
      message: "success",
      token,
      user: {
        userId: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
