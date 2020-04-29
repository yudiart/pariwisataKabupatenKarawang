const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

//Connect DB
connectDB();

app.use(bodyParser.json());
// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));
//form-urlencoded
//Initalize middleware
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
  next();
});
//Define routes
app.use("/api/users",cors(), require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/covid", require("./routes/api/covid"));
app.use("/api/villa",require("./routes/api/villa"));
app.use("/api/room",require("./routes/api/rooms"));
app.use('/uploads', express.static('uploads'));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5005;

app.listen(PORT);
