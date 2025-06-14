const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const {
  INTERNAL_SERVER_ERROR,
  CREATED,
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utils/errors");

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      console.log("LOGIN SUCCESS");
      return res.status(OK).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return res
          .status(UNAUTHORIZED)
          .json({ message: "Incorrect email or password" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "The 'email' and 'password' fields are required" });
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      return res.status(CREATED).json(userObj);
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return res
          .status(CONFLICT)
          .json({ message: "User with this email already exists" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).json({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "An error has occurred on the server" });
    });
};

const getCurrentUser = (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(UNAUTHORIZED).json({ message: "Authorization required" });
  }

  return User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(OK).json(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .json({ message: "Requested resource not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).json({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "An error has occurred on the server" });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).json({ message: "User not found" });
      }
      return res.status(OK).json(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).json({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ message: "An error has occurred on the server" });
    });
};

module.exports = { updateUser, createUser, getCurrentUser, login };
