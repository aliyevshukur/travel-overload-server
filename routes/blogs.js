const express = require("express");
const {
  getNewestBlogs,
  getPopularBlogs,
  getBlog,
  postBlog,
  updateBlog,
  deleteBlog,
  increaseView,
} = require("../controllers/blogs");
const router = express.Router();

router.get("/newest", getNewestBlogs);
router.get("/popular", getPopularBlogs);
router.get("/:id", getBlog);
router.post("/", postBlog);
router.post("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.post("/view/:id", increaseView);

module.exports = router;
