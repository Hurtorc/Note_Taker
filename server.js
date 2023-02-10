const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");

const apiRoutes = require("./routes/apiRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", apiRoutes);

//GET request for index page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Spinning up the server
app.listen(PORT, () => {
  console.log(`server now on port ${PORT}!`);
});
