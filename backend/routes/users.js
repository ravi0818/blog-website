const mongoose = require("mongoose");
require("dotenv").config();

const { HttpError } = require("../model/HttpError");
const { User } = require("../model/Schema");

const getUsers = async (req, res, next) => {
  let response;
  try {
    response = await User.find().select(["-password"]);
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

const changeUserRole = async (req, res, next) => {
  let response;
  try {
    const id = mongoose.Types.ObjectId(req.query.id);
    const role = req.query.role == "admin" ? true : false;
    response = await User.updateOne({ _id: id }, { isAdmin: role });
    res.json(response);
  } catch (error) {
    next(new HttpError(error.message, error.code));
  }
};

module.exports = { getUsers, changeUserRole };
