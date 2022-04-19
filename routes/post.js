const express = require("express");
const PostConntroller = require("../controller/postController");
const postRouter = express.Router();
const upload = require("../middlewares/multer");
const auth = require("../middlewares/userAuth");
const authorization = require("../middlewares/authorization");

postRouter.post("/upload", upload, auth, authorization, PostConntroller.postUpload);


module.exports = postRouter;
