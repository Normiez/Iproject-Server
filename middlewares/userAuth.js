const { User } = require("../models/index");
const { verifyToken } = require("../helpers/jwt");
const auth = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);
    const respond = await User.findOne({ where: { id: payload.id } });
    if (!payload || !access_token) {
      throw new Error("INVALID_TOKEN");
    }
    req.userData = {
      id: payload.id,
      uid: payload.uid,
      email: payload.email,
      role: respond.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
