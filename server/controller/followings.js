import express from "express";
import db from "../database/connect.js";
import { ratingsValidator } from "../middleware/validate.js";

const Router = express.Router();

// get user following list

Router.get("/:userId", async (req, res) => {
  try {
    const followings = await db.Followings.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    const followingsList = await db.Users.findAll({
      where: {
        id: followings.map((following) => following.followingId),
      },
    });
    res.json({ followings, followingsList });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

Router.post("/add/", async (req, res) => {
  try {
    const existingFollowing = await db.Followings.findAll({
      where: {
        userId: req.body.userId,
        followingId: req.body.followingId,
      },
    });
    if (existingFollowing.length > 0) {
      await db.Followings.destroy({
        where: {
          userId: req.body.userId,
          followingId: req.body.followingId,
        },
      });
      res.send("Deleted following");
    } else {
      const following = await db.Followings.create(req.body);
      res.json(following);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

export default Router;
