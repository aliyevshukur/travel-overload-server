const { json } = require("express");
const Blogs = require("../models/blog-model");
const User = require("../models/user-model");

// Post new blogs to MongoDB database
const postBlog = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ error: "Request body is empty" });
    }

    const blogs = await Blogs.create(req.body);
    console.log("Blog created: ", JSON.stringify(req.body));
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get blogs from MongoDB database
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find().populate("author");
    // const sortedBlogs = blogs.sort((nextBlog, prevBlog) => {
    //   a = nextBlog.postDate;
    //   b = prevBlog.postDate;
    //   return a > b ? 1 : a < b ? -1 : 0;
    // });
    res.status(200).json(blogs);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get single blog from MongoDB database
const getBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blogs.findById(id).populate("author");
    console.log(`Author, ${JSON.stringify(blog.author)}`);

    if (!blog) {
      return res
        .status(404)
        .json({ message: `Cannot find blog with ID: ${id}` });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update a blog from MongoDB database
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findByIdAndUpdate(id, req.body);
    if (!blog) {
      return res
        .status(404)
        .json({ message: `Cannot find blog with ID: ${id}` });
    }

    const updatedBlog = await Blogs.findById(id);
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog from MongoDB database
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findByIdAndDelete(id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: `Cannot find blog with ID: ${id}` });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
