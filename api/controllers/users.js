const bcrypt = require("bcryptjs");
const User = require("../models/user");
const generateToken = require("../models/token_generator");

const createUser = async (req, res) => {
  try {
    let user = req.body;
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    user = await User.create(user);
    user = user.toObject();

    delete user.password;
    delete user.__v;
    const token = generateToken(user._id);

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { _id: req.userId },
      { password: 0, __v: 0 }
    );
    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let user = req.body;

    if (user.password) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    }

    user = await User.findOneAndUpdate({ _id: req.userId }, user, {
      projection: { password: 0, __v: 0 },
      new: true,
    });
    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createUser, getUser, updateUser };
