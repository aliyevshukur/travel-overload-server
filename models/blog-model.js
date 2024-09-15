const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
      default: "",
    },
    context: {
      type: String,
      required: [true, "Please enter context"],
      default: "",
    },
    image: {
      type: String,
      required: [true, "Please enter image"],
      default: "",
    },
    postDate: {
      type: String,
      required: [true, "Please enter postDate"],
      default: "",
    },
    author: {
      type: String,
      required: [true, "Please enter author"],
      default: "",
    },
    authorImage: {
      type: String,
      required: [true, "Please enter authorImage"],
      default: "",
    },
  },
  {
    timestamp: true,
  },
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
