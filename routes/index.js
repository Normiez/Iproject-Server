const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");
const auth = require("../middlewares/userAuth");

router.post("/login", UserController.doLogin);
router.post("/register", UserController.doRegister);
router.get("/checkAuth", auth);

module.exports = router;
