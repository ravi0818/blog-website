const { HttpError } = require("../model/HttpError");
const { BlogPost } = require("../model/Schema");
const multer = require("multer");
const { default: mongoose } = require("mongoose");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage }).single("image");

const createPost = async (req, res, next) => {
  let response;
  console.log(req.body);
  try {
    response = await BlogPost.create(req.body);
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

const updatePost = async (req, res, next) => {
  let response;
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    response = await BlogPost.updateOne(
      { _id: id },
      { ...req.body, isApproved: false, isPublished: false }
    );
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

const deletePost = async (req, res, next) => {
  let response;
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    response = await BlogPost.deleteOne({ _id: id });
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

const postImage = async (req, res, next) => {
  upload(req, res, function (error) {
    if (error instanceof multer.MulterError) {
      next(new HttpError(error.message, error.code));
      // throw new HttpError("failed to upload!");
    } else if (error) {
      next(new HttpError(error.message, error.code));
      // throw new HttpError("failed to upload!");
    }
    console.log("uploaded");
    res.send(process.env.BASE_URL + req.file.filename);
  });
};

const getApprovedPost = async (req, res, next) => {
  let response;
  try {
    const skip = req.query.skip;
    const limit = req.query.limit;
    response = await BlogPost.find({
      isApproved: true,
      isPublished: true,
    })
      .skip(skip)
      .limit(limit)
      .populate("postedBy", "name");
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

const getSearchedPost = async (req, res, next) => {
  let response;
  try {
    const search = req.query.search;
    console.log(search);
    response = await BlogPost.find({
      $text: { $search: search },
      isApproved: true,
      isPublished: true,
    }).populate("postedBy", "name");
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

const getPost = async (req, res, next) => {
  let response;
  try {
    const status = req.query.status;
    const author = req.query.author;
    if (status == "approved") {
      response = await BlogPost.find({
        isApproved: true,
      }).populate("postedBy", "name");
    } else if (status == "unapproved") {
      response = await BlogPost.find({
        isApproved: false,
      }).populate("postedBy", "name");
    } else if (status == "published") {
      response = await BlogPost.find({
        isPublished: true,
      }).populate("postedBy", "name");
    } else if (author) {
      response = await BlogPost.find({
        postedBy: mongoose.Types.ObjectId(author),
      }).populate("postedBy", "name");
    }
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

const getTopPost = async (req, res, next) => {
  let response;
  try {
    response = await BlogPost.find({
      isPublished: true,
    })
      .sort("-views")
      .limit(4)
      .populate("postedBy", "name");
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

const getPostById = async (req, res, next) => {
  let response;
  try {
    await BlogPost.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id), isPublished: true },
      { $inc: { views: 1 } }
    );
    response = await BlogPost.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
      isPublished: true,
    }).populate("postedBy", "name");
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

const getPostByIdAdmin = async (req, res, next) => {
  let response;
  try {
    // await BlogPost.updateOne(
    //   { _id: mongoose.Types.ObjectId(req.params.id) },
    //   { $inc: { views: 1 } }
    // );
    response = await BlogPost.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
    }).populate("postedBy", "name");
    console.log(response);
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

const approvePost = async (req, res, next) => {
  let response;
  try {
    response = await BlogPost.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { isApproved: true }
    );
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

const publishPost = async (req, res, next) => {
  let response;
  try {
    console.log(req.params);
    response = await BlogPost.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { isPublished: true }
    );
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

const unpublishPost = async (req, res, next) => {
  let response;
  try {
    response = await BlogPost.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { isPublished: false }
    );
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  postImage,
  getApprovedPost,
  getSearchedPost,
  getPost,
  getPostById,
  getTopPost,
  approvePost,
  publishPost,
  unpublishPost,
  getPostByIdAdmin,
};
