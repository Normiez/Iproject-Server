const { User, Post, Cart } = require("../models/index");
const firebase = require("../config/firebaseConfig");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const storage = getStorage(firebase);
global.XMLHttpRequest = require("xhr2");
class PostConntroller {
  static async postUpload(req, res, next) {
    try {
      const { title, description, stock, imgUrl, price } = req.body;
      const { id, uid } = req.userData;
      if (!imgUrl) {
        const file = req.file;
        const timestamp = Date.now();
        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${name}_${timestamp}.${type}`;
        const fileLocation = `/User/${uid}/${fileName}`;

        const imageRef = ref(storage, fileLocation);

        await uploadBytes(imageRef, file.buffer);
        const downloadURL = await getDownloadURL(ref(storage, imageRef));
        await Post.create({
          title,
          description,
          imgUrl: downloadURL,
          fileLocation: fileLocation,
          stock,
          price,
          sellerId: id,
        });
        res.status(201).json({ message: "Post Created" });
      } else {
        await Post.create({
          title,
          description,
          imgUrl: downloadURL,
          fileLocation: "imgUrl",
          stock,
          price,
          sellerId: id,
        });
        res.status(201).json({ message: "Post Created" });
      }
    } catch (error) {
      next(error);
    }
  }
  static async postDelete(req, res, next) {
    try {
      const { postId } = req.params;
      const { id } = req.userData;
      const respond = await Post.findByPk(postId);
      if (!respond) {
        throw new Error("POST_NOT_FOUND");
      }
      if (respond.sellerId !== id) {
        throw new Error("FORBIDDEN");
      }
      const refrence = ref(storage, respond.fileLocation);
      await deleteObject(refrence);
      await Post.destroy({ where: { id: respond.id } });
      res.status(200).json({ message: "Post has been deleted" });
    } catch (error) {
      next(error);
    }
  }
  static async fetchPostId(req, res, next) {
    try {
      const { postId } = req.params;
      const respond = await Post.findOne({
        where: { id: postId },
        include: { model: User },
      });
      res.status(200).json(respond);
    } catch (err) {
      next(err);
    }
  }
  static async fetchAllData(req,res,next){
      try {
          const respond = await Post.findAll()
          res.status(200).json(respond)
      } catch (err) {
          next(err)
      }
  }
}

module.exports = PostConntroller;
