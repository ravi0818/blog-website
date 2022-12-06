const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../model/HttpError");
const { User } = require("../model/Schema");

register = async (req, res, next) => {
  // Our register logic starts here
  try {
    // Get user input
    const { name, email, password } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      throw new HttpError("All input is required", 400);
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      throw new HttpError("User Already Exist. Please Login", 409);
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      {
        user_id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    // user.token = token;

    // return new user
    res.status(201).json(token);
  } catch (err) {
    // console.log(err);
    next(new HttpError(err.message, err.code));
  }
  // Our register logic ends here
};

module.exports = { register };
