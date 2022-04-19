const express = require("express");
const postRouter = express.Router();
const PostConntroller = require("../controller/postController");
const upload = require("../middlewares/multer");
const auth = require("../middlewares/userAuth");
const authorization = require("../middlewares/authorization");

postRouter.get("/", PostConntroller.fetchAllData)
postRouter.post("/upload", upload, auth, authorization, PostConntroller.postUpload);
postRouter.get("/:postId", PostConntroller.fetchPostId)
postRouter.delete("/:postId", auth, authorization, PostConntroller.postDelete);


module.exports = postRouter;
