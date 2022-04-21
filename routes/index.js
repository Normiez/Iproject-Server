const express = require("express");
const router = express.Router();
const postRouter = require("./post");
const customerRouter = require("./customer");
const UserController = require("../controller/userController");
const auth = require("../middlewares/userAuth");

router.post("/login", UserController.doLogin);
router.post("/register", UserController.doRegister);
router.post("/logout", UserController.signOut);
router.post("/googleAuth", UserController.googleAuth);
router.get("/checkAuth", auth);
router.use("/post", postRouter);
router.use("/customer", customerRouter);

module.exports = router;
