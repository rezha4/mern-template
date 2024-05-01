import express from "express";
import session from "express-session";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  session({
    secret: "cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    origin: ["localhost:4173"],
    credentials: true,
  })
);

app.post("/login", (req, res) => {
  const username = req.body.username;
  req.session.username = username;
  res.json({ body: req.body, username });
});

app.get("/isAuth", (req, res) => {
  if (req.session.username) {
    res.json({ msg: "authorized", username: req.session.username });
  } else {
    res.status(401).json({ msg: "401" });
  }
});

app.get("/", (req, res) => {
  res.json({ msg: "mern-template API" });
});

app.listen(3000, () => {
  console.log("app running on port 3000");
});
