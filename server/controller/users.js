import express from "express";
import db from "../database/connect.js";
import bcrypt from "bcrypt";
import { registerValidator, loginValidator } from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();
const saltRounds = 10;

router.post("/register", registerValidator, async (req, res) => {
  try {
    const userExists = await db.Users.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      res.status(400).send("User already exists");
      return;
    }
    const { username, first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    new db.Users({
      username,
      first_name,
      last_name,
      email,
      password: hashedPassword,
    }).save();
    res.send("User created");
  } catch {
    res.status(400).send("Registration unsuccessful");
  }
});

router.post("/login", loginValidator, async (req, res) => {
  try {
    const user = await db.Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user.length === 0) {
      console.log("User not found");
      return res.status(400).send("User not found");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.dataValues.password
    );
    if (validPassword) {
      req.session.loggedIn = true;
      req.session.user = {
        id: user.id,
        email: user.email,
        username: user.username,
        image: user.image,
        role: user.role,
      };
      return res.json({
        loggedIn: req.session.loggedIn,
        response: req.session.user,
        message: "Login successful",
      });
    } else console.log("User successfully logged in");
  } catch {
    res.status(500).send("Error occured");
  }
});

router.put("/edit/:id", upload.single("image"), async (req, res) => {
  console.log(req.body);
  if (req.file) {
    req.body.image = "/uploads/" + req.file.filename;
  }
  try {
    const user = await db.Users.findOne({
      where: {
        id: req.params.id,
      },
      include: db.Posts,
    });
    if (user) {
      const { image } = req.body;

      await db.Users.update(
        {
          image,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      await db.Posts.update(
        {
          author_image: image,
        },
        {
          where: {
            userId: req.params.id,
          },
        }
      );
      res.send("User updated");
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await db.Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("User logged out");
});

router.get("/check-auth", auth, async (req, res) => {
  return res.json(req.session.user);
});

export default router;
