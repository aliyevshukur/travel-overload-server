const express = require("express");
const {
  getAllBlogs,
  getBlog,
  postBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogs");
const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.post("/", postBlog);
router.post("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
