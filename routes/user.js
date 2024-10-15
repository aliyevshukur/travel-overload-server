const express = require("express");
const { authenticate } = require("../middlewares/auth");
const { uploadProfilePicture } = require("../controllers/user");

const router = express.Router();

router.get("/profile", authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.name} ${req.user.surname}` });
});

router.post("/user/profile", authenticate, uploadProfilePicture);

module.exports = router;
