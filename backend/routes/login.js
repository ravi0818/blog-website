const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../model/HttpError");
const { User } = require("../model/Schema");

const login = async (req, res, next) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      throw new HttpError("All input is required", 400);
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
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
      res.status(200).json(token);
    } else {
      throw new HttpError("Invalid Credentials", 400);
    }
  } catch (err) {
    // console.log(err.message, err.code);
    next(new HttpError(err.message, err.code));
  }
  // Our register logic ends here
};

module.exports = { login };
