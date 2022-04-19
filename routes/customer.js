const express = require("express");
const customerRouter = express.Router();
const CustomerController = require("../controller/customerController");
const auth = require("../middlewares/userAuth");

customerRouter.post("/", CustomerController.buy);

module.exports = customerRouter;
