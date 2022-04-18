const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");

router.post("/login", UserController.doLogin);
router.post("/register", UserController.doRegister);

module.exports = router;
