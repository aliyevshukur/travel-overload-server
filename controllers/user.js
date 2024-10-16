const User = require("../models/user-model");

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
  try {
    const user = await User.findById(req.user._id);
    const blogs = await Blog.find({ author: user._id });
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

module.exports = { uploadProfilePicture, getUserBlogs, getUser };
