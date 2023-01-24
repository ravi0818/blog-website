const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
});

const blogPostSchema = mongoose.Schema({
  title: String,
  category: String,
  summary: String,
  coverImage: String,
  body: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postedAt: { type: Date, default: () => Date.now() },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  views: { type: Number, default: 0 },
});

blogPostSchema.index({ title: "text" });

const User = mongoose.model("User", userSchema);

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = { BlogPost, User };
