import express from "express";
import { Op } from "sequelize";
import db from "../database/connect.js";
import { auth, adminAuth } from "../middleware/auth.js";
import { postValidator } from "../middleware/validate.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const options = {};
  if (req.query.order) {
    options.order = [["createdAt", "ASC"]];
  }
  try {
    const posts = await db.Posts.findAll(options);
    res.json(posts);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.Posts.findByPk(req.params.id, {
      include: [db.Users, db.Comments],
    });
    console.log(post);
    res.json(post);
  } catch {
    res.status(500).send("Server error");
  }
});

// one post with comments
router.get("/user-post/:id", async (req, res) => {
  try {
    const post = await db.Posts.findByPk(req.params.id, {
      include: db.Users,
    });
    res.json(post);
  } catch {
    res.status(500).send("Server error");
  }
});

router.post("/", upload.single("image"), postValidator, async (req, res) => {
  if (req.file) {
    req.body.image = "/uploads/" + req.file.filename;
  }
  try {
    new db.Posts(req.body).save();
    res.send("Post created");
  } catch {
    res.status(500).send("Server error");
  }
});

router.put(
  "/edit/:id",
  upload.single("image"),
  postValidator,
  async (req, res) => {
    try {
      const post = await db.Posts.findByPk(req.params.id);
      post.update(req.body);
      res.send("Post successfuly updated");
    } catch {
      res.status(500).send("Server error");
    }
  }
);

router.delete("/delete/:id", async (req, res) => {
  try {
    const post = await db.Posts.findByPk(req.params.id);
    post.destroy(req.body);
    res.send("Post successfuly deleted");
  } catch {
    res.status(500).send("Session time expired, please login again");
  }
});

// search route
router.get("/search/:keyword", async (req, res) => {
  try {
    const posts = await db.Posts.findAll({
      where: {
        title: {
          [Op.like]: "%" + req.params.keyword + "%",
        },
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
