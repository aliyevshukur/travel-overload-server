const express = require("express");
const { authenticate } = require("../middlewares/auth");
import { uploadProfilePicture } from "../controllers/user";

const router = express.Router();

router.get("/profile", authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.name} ${req.user.surname}` });
});

router.post("/user/:id", authenticate, uploadProfilePicture);

module.exports = router;
