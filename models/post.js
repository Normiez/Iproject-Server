"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "sellerId" });
      Post.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: "postId",
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      stock: DataTypes.INTEGER,
      imgUrl: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
