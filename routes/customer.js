const express = require("express");
const customerRouter = express.Router();
const CustomerController = require("../controller/customerController");
const auth = require("../middlewares/userAuth");
const authorization = require("../middlewares/authorizationCust");

customerRouter.get("/", auth, authorization, CustomerController.cartList);
customerRouter.post("/xendit", auth, authorization, CustomerController.confirmed);
customerRouter.post("/:postId", auth, authorization, CustomerController.buy);

module.exports = customerRouter;
