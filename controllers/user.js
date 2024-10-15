const User = require("../models/user-model");
const uploadProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profilePictureUrl = req.body;

    if (!profilePictureUrl) {
      return res
        .status(400)
        .json({ ok: false, message: "No picture URL provided" });
    }

    // Validate the picture URL
    const validUrl =
      /^(http(s)?:\/\/)?([w]{3}\.)?([a-zA-Z0-9\-\.]+)\.(com|org|net|edu|gov|mil|biz|info|name|pro|aero|coop|jobs|mobi|museum|travel|[a-zA-Z]{2,3})$/;
    if (!validUrl.test(pictureUrl)) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid picture URL" });
    }

    // Update the user's profile picture URL
    user.profilePictureUrl = profilePictureUrl;
    await user.save();

    res
      .status(200)
      .json({ ok: true, message: "Profile picture URL updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

module.exports = { uploadProfilePicture };
