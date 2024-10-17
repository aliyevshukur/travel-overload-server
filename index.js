const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const blogsRoutes = require("./routes/blogs");

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cors());
app.use(setCorsHeaders);

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Define authentication routes
app.use("/auth", authRoutes);

// Define user routes
app.use("/user", userRoutes);

//Define blogs router
app.use("/blogs", blogsRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

function setCorsHeaders(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, PUT, PATCH, DELETE",
  // );
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}
