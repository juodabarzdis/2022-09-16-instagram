import express from "express";
import { Op } from "sequelize";
import db from "../database/connect.js";
import { auth, adminAuth } from "../middleware/auth.js";
import { postValidator } from "../middleware/validate.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  // const options = {};
  // if (req.query.order) {
  //   options.order = [["createdAt", "ASC"]];
  // }
  try {
    const posts = await db.Posts.findAll({
      include: [db.Users, db.Likes, db.Comments],
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.Posts.findByPk(req.params.id, {
      include: [db.Users, db.Comments, db.Likes],
    });
    res.json(post);
  } catch {
    res.status(500).send("Server error");
  }
});

router.get("/user/:id", auth, async (req, res) => {
  try {
    const posts = await db.Posts.findAll({
      where: {
        userId: req.params.id,
      },
      include: [db.Users, db.Likes, db.Comments],
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
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

//edit author images on posts
router.put(
  "/api/posts/edit-post-author-image/:id",
  upload.single("author_image"),
  async (req, res) => {
    if (req.file) {
      req.body.image = req.body.author_image;
      req.body.author_image = "/uploads/" + req.file.filename;
    }
    try {
      const { author_image } = req.body;
      const post = await db.Posts.findAll({
        where: {
          userId: req.params.id,
        },
      });
      post.forEach((post) => {
        post.update({
          author_image,
        });
      });
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
