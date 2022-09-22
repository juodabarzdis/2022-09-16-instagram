import { DataTypes } from "sequelize";

const Followings = (sequelize) => {
  const Schema = {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };
  return sequelize.define("followings", Schema);
};

export default Followings;
