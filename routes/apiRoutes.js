const router = require("express").Router();
const fs = require("fs");

// GET request for notes
router.get("/notes", (req, res) => {
    console.log(`GET request for notes: ${req.body}`);
    res.sendFile(path.join(__dirname, "../db/db.json"));
    JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
});


// POST request for notes
router.post("/notes", (req, res) => {
    console.log(`POST request for notes: ${req.body}`);
    let newNote = req.body;
    let notes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
    notes.push(newNote);
    fs.writeFileSync("../db/db.json", JSON.stringify(notes));
    res.json(notes);
});

