import express from "express";
import db from "../database/connect.js";
import { ratingsValidator } from "../middleware/validate.js";

const Router = express.Router();

// get post likes
Router.get("/:id", async (req, res) => {
  try {
    const likes = await db.Likes.findAll({
      where: {
        postId: req.params.id,
      },
    });
    res.json(likes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

Router.post("/:id", ratingsValidator, async (req, res) => {
  req.body.postId = req.params.id;
  try {
    const existingLike = await db.Likes.findOne({
      where: {
        postId: req.params.id,
        userId: req.body.userId,
      },
    });
    if (existingLike) {
      await db.Likes.destroy({
        where: {
          postId: req.params.id,
          userId: req.body.userId,
        },
      });
      res.send("Deleted like");
    } else {
      const like = await db.Likes.create(req.body);
      res.json(like);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    await db.Likes.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Deleted like");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

export default Router;
