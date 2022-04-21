const firebase = require("../config/firebaseConfig");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithCredential,
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
      res.status(200).json({
        access_token: token,
        email: userCredential.user.email,
        role: respond.role,
      });
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
      if (role !== "customer" && role !== "seller") {
        throw new Error("ROLE_INVALID");
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
  static async googleAuth(req, res, next) {
    try {
      const { id_token } = req.body;
      const credential = GoogleAuthProvider.credential(id_token);
      const result = await signInWithCredential(auth, credential);
      res.status(200).json(result); // belom kelar
    } catch (err) {
      next(err);
    }
  }
  static signOut(req, res, next) {
    signOut(auth)
      .then(() => {
        res.status(200).json({ message: "Logout success" });
      })
      .catch((error) => {
        next(error);
      });
  }
}

module.exports = UserController;
