const express = require("express");
const { authenticate } = require("../middlewares/auth");
const {
  uploadProfilePicture,
  getUser,
  changeName,
  changePassword,
  getUserBlogs,
} = require("../controllers/user");

const router = express.Router();

router.get("/", authenticate, getUser);

router.post("/profile", authenticate, uploadProfilePicture);

router.post("/password", authenticate, changePassword);

router.post("/name", authenticate, changeName);

router.get("/blogs", authenticate, getUserBlogs);

module.exports = router;
