const User = require("../models/user");


   // Get User function
async function getUser(req, res, next) {
    let user;
    try {
      user = await User.findById(req.params.id);

      if (!user) res.status(404).json({ message: "Could not find user" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    res.user = user;
    return next();
  }

  module.exports = { getUser};