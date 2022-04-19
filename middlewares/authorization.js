const { User } = require("../models/index");
const authorize = async (req, res, next) => {
  try {
    const { id } = req.userData;
    const respond = await User.findOne({ where: { id } });
    if (respond.role !== "seller") {
      throw new Error("FORBIDDEN");
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authorize;
