const express = require("express");
const customerRouter = express.Router();
const CustomerController = require("../controller/customerController");
const auth = require("../middlewares/userAuth");
const authorization = require("../middlewares/authorizationCust");

customerRouter.post("/", auth, authorization, CustomerController.buy);

module.exports = customerRouter;
