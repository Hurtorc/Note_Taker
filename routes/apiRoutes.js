const router = require("express").Router();
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");

const dbPath = path.join(__dirname, "..", "db", "db.json");

// GET request for notes
router.get("/", (req, res) => {
  console.log(`GET request for notes: ${req.method}`);
  const notes = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  res.json(notes);
});

// POST request for notes
router.post("/", (req, res) => {
  console.log(`POST request for notes: ${req.method}`);
  const newNote = ({ title, text, id } = req.body);
  newNote.id = uuid.v4();

  const previousNotes = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  previousNotes.push(newNote);

  fs.writeFileSync(dbPath, JSON.stringify(previousNotes), (err) => {
    err ? console.error(err) : console.log("Note added successfully!");
  });
  const response = {
    status: "success",
    body: newNote,
  };

  console.log(response);
  res.status(201).json(response);
});

router.delete("/:id", (req, res) => {
  console.log(`DELETE request for notes: ${req.method}`);
  const notes = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  const noteIndex = notes.findIndex((note) => note.id === req.params.id);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    fs.writeFileSync(dbPath, JSON.stringify(notes));
    res.json(notes);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

module.exports = router;
