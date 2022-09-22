// This is: Database connection scheme

import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import Users from "../model/users.js";
import Posts from "../model/posts.js";
import Comments from "../model/comments.js";
import Likes from "../model/likes.js";
import Followings from "../model/followings.js";

const database = {};

// per egza keiciam tik credentials
const credentials = {
  host: "localhost",
  user: "root",
  password: "",
  database: "instagram", // database name
};

// Connection to MySQL database
try {
  const connection = await mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
  });

  // Create database
  await connection.query(
    "CREATE DATABASE IF NOT EXISTS " + credentials.database
  );

  // Use database
  const sequelize = new Sequelize(
    credentials.database,
    credentials.user,
    credentials.password,
    {
      dialect: "mysql",
    }
  );

  // Create tables

  database.Users = Users(sequelize);
  database.Posts = Posts(sequelize);
  database.Comments = Comments(sequelize);
  database.Likes = Likes(sequelize);
  database.Followings = Followings(sequelize);

  //followings

  // Create relationships

  database.Posts.hasMany(database.Comments);
  database.Posts.hasMany(database.Likes);

  database.Users.hasMany(database.Posts);
  database.Users.belongsTo(database.Posts);
  database.Posts.belongsTo(database.Users);
  database.Comments.belongsTo(database.Users);
  database.Comments.belongsTo(database.Posts);
  database.Likes.belongsTo(database.Users);
  database.Likes.belongsTo(database.Posts);

  //following

  database.Users.hasMany(database.Followings);
  database.Followings.belongsTo(database.Users);

  // Sync database

  await sequelize.sync({ alter: true }); // alter: true - if table already exist, it will not create new table, but it will add new column
} catch (error) {
  console.log(error);
  console.log("Error connecting to database");
}

export default database;
