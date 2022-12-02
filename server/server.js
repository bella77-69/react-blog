const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const blogRoute = require("./routes/blog.route");
require("dotenv").config();
const app = express();
// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/blogs", blogRoute);
// Server
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the server" });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
