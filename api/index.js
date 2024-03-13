const express = require("express");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const postRoutes = require("./routes/posts.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const port = 3000;

//Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

//Upload image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), function (req, res, next) {
  const file = req.file;
  res.status(200).json(file.filename);
});

//Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`This app listening on port ${port}!`));
