import express from "express";
import cors from "cors";
import session from "express-session";
import Users from "./controller/users.js";
import Posts from "./controller/posts.js";
import Comments from "./controller/comments.js";
import Likes from "./controller/likes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.set("trust proxy", 1);
app.use(
  session({
    name: "session",
    secret: "1234",
    resave: true, // pakeiciau sita
    saveUninitialized: false,
    cookie: {
      secure: false, // only send cookie over https if true
      expires: new Date(Date.now() + 60 * 1000000000),
      maxAge: 60 * 1000000000,
    },
  })
);

app.use("/api/users", Users);
app.use("/api/posts", Posts);
app.use("/api/comments", Comments);
app.use("/api/likes", Likes);

app.use("/uploads", express.static("uploads"));

app.listen(3000);
