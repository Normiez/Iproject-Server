const firebase = require("../config/firebaseConfig");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const auth = getAuth(firebase);

class UserController {
  static async doLogin(req, res, next) {
    try {
      const { email, password } = req.body;
    } catch (err) {
      next(err);
    }
  }
  static async doRegister(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const data = await createUserWithEmailAndPassword(auth, email, password);
      console.log(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
