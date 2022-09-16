import express from "express";
import cors from "cors";
import session from "express-session";
import Users from "./controller/users.js";
import Posts from "./controller/posts.js";
import Comments from "./controller/comments.js";

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
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // only send cookie over https if true
      maxAge: 600000,
    },
  })
);

app.use("/api/users", Users);
app.use("/api/posts", Posts);
app.use("/api/comments", Comments);

app.use("/uploads", express.static("uploads"));

app.listen(3000);
