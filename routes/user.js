const express = require("express");
const { authenticate } = require("../middlewares/auth");
const { uploadProfilePicture, getUser } = require("../controllers/user");

const router = express.Router();

router.get("/", authenticate, getUser);

router.post("/profile", authenticate, uploadProfilePicture);

module.exports = router;
