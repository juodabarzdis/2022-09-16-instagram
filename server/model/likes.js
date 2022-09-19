import { DataTypes } from "sequelize";

const Likes = (sequelize) => {
  const Schema = {
    like: {
      type: DataTypes.BOOLEAN,
      // unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };
  return sequelize.define("likes", Schema);
};

export default Likes;
