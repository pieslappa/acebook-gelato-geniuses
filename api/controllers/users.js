const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res
      .status(201)
      .json({ message: "You've successfully signed up. Please log in." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createUser };
