const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utilities/genrateToken");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.passwordmatching(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log(req.body);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    profile_pic: pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const getProfile = async (req, res) => {
  const user_id = req.body._id;
  const profile = await User.findById(user_id);
  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ message: "Profile Not Found" });
  }
};
// console.log(typeof authUser);
module.exports = { registerUser, authUser, getProfile };
