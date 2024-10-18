const User = require("../models/user-model");
const Blogs = require("../models/blog-model");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    res.status(200).json({ ok: true, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profilePictureUrl = req.body.url;

    if (!profilePictureUrl) {
      return res
        .status(400)
        .json({ ok: false, message: "No picture URL provided" });
    }

    user.profilePicture = profilePictureUrl;
    await user.save();

    res.status(200).json({
      ok: true,
      message: "Profile picture URL updated successfully",
      url: profilePictureUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

const getUserBlogs = async (req, res) => {
  console.log("FETCHED USER BLOGS");
  try {
    const blogs = await Blogs.find({ author: req.user._id }).populate("author");
    res.status(200).json({ ok: true, blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }
    const passwordMatch = await user.comparePassword(oldPassword);
    console.log(`Is password matching in change password ${passwordMatch}`);

    if (!passwordMatch) {
      return res.status(401).json({ ok: false, message: "Incorrect password" });
    }

    console.log(
      `User ${user.email} password changed to: `,
      newPassword,
      "from ",
      oldPassword,
    );

    const hashedPassword = await bcrypt.hash(
      newPassword,
      User.SALT_WORK_FACTOR,
    );
    user.password = hashedPassword;
    await user.save();
    res
      .status(200)
      .json({ ok: true, message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

const changeName = async (req, res) => {
  try {
    const { name, surname, password } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return res.status(401).json({ ok: false, message: "Incorrect password" });
    }

    user.name = name;
    user.surname = surname;
    await user.save();
    res.status(200).json({ ok: true, message: "Name changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

module.exports = {
  uploadProfilePicture,
  getUserBlogs,
  getUser,
  changeName,
  changePassword,
};
