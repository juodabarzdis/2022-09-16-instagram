import express from "express";
import db from "../database/connect.js";
import { ratingsValidator } from "../middleware/validate.js";

const Router = express.Router();

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
    await db.Likes.create(req.body);
    res.send("Liked post");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

export default Router;
