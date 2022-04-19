const firebase = require("../config/firebaseConfig");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const { signToken } = require("../helpers/jwt");
const auth = getAuth(firebase);
const { User } = require("../models/index");

class UserController {
  static async doLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw new Error("EMAIL_REQUIRED");
      }
      if (!password) {
        throw new Error("PASSWORD_REQUIRED");
      }
      const respond = await User.findOne({ where: { email: email } });
      if (!respond) {
        throw new Error("INVALID_USER");
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = signToken({
        id: respond.id,
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      });
      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }
  static async doRegister(req, res, next) {
    try {
      const { email, password, role, address } = req.body;
      if (!password) {
        throw new Error("PASSWORD_REQUIRED");
      }
      if (!role) {
        throw new Error("ROLE_REQUIRED");
      }
      await createUserWithEmailAndPassword(auth, email, password);
      await User.create({
        email,
        role,
        address,
      });
      res.status(201).json({ message: "User created" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
