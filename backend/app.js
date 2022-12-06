const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const userAuth = require("./middleware/user-auth");
const adminAuth = require("./middleware/admin-auth");

const {
  createPost,
  postImage,
  getPost,
  getPostById,
  getTopPost,
  approvePost,
  publishPost,
  unpublishPost,
  getPostByIdAdmin,
  updatePost,
  deletePost,
} = require("./routes/post");
const { register } = require("./routes/register");
const { login } = require("./routes/login");
const { getUsers, changeUserRole } = require("./routes/users");

const app = express();

const DB_URL = process.env.DB_URL;
mongoose.connect(
  DB_URL,
  () => console.warn("Connection Succsesfull"),
  (err) => console.error(err)
);

app.use(bodyParser.json());

app.use(express.static("./uploads"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// const options = { ordered: true };

app.get("/", (req, res, next) => {
  res.send("<a href='http://localhost:3000'>Go to frontend</a>");
});

app.get("/api/v1/posts", getPost);
app.get("/api/v1/topposts", getTopPost);
app.post("/api/v1/register", register);
app.post("/api/v1/login", login);

app.get("/api/v1/posts/:id", getPostById);
app.get("/api/v1/posts/publish/:id", userAuth, publishPost);
app.get("/api/v1/posts/unpublish/:id", userAuth, unpublishPost);
app.post("/api/v1/posts", userAuth, createPost);
app.post("/api/v1/images", userAuth, postImage);
app.post("/api/v1/posts/update/:id", userAuth, updatePost);
app.get("/api/v1/user/posts/delete/:id", userAuth, deletePost);

app.get("/api/v1/admin/users", adminAuth, getUsers);
app.get("/api/v1/admin/posts/approve/:id", adminAuth, approvePost);
app.get("/api/v1/admin/users/update", adminAuth, changeUserRole);
app.get("/api/v1/admin/posts/:id", adminAuth, getPostByIdAdmin);
app.get("/api/v1/admin/posts/delete/:id", adminAuth, deletePost);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  console.log(error.message, error.code);
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Application is running at http://localhost:" + process.env.PORT)
);
