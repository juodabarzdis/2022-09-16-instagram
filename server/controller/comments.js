import express from "express";
import { auth } from "../middleware/auth.js";
import { commentsValidator } from "../middleware/validate.js";
import db from "../database/connect.js";

const router = express.Router();

// prieš commentsValidator reikia auth
router.post("/", auth, commentsValidator, async (req, res) => {
  try {
    await db.Comments.create(req.body);
    res.send("Comment created");
  } catch (error) {
    console.log("error");
    res.status(500).send("Server error");
  }
});

export default router;
