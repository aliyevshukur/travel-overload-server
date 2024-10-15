const express = require("express");
const { authenticate } = require("../middlewares/auth");
const { uploadProfilePicture } = require("../controllers/user");

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.name} ${req.user.surname}` });
});

router.post("/profile", authenticate, uploadProfilePicture);

module.exports = router;
