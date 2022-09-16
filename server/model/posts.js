import { DataTypes } from "sequelize";

const Posts = (sequelize) => {
  const Schema = {
    author_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  };
  return sequelize.define("posts", Schema);
};

export default Posts;
