// CommonJS module for node.js
// const http = require("http");

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);

// using Express with CORS
// const express = require("express");
// const cors = require("cors");
// const app = express();

// const requestLogger = (req, res, next) => {
//   console.log("Method:", req.method);
//   console.log("Path:  ", req.path);
//   console.log("Body:  ", req.body);
//   console.log("---");

//   next();
// };

// const unknownEndpoint = (req, res) => {
//   res.status(404).send({ error: "unknown endpoint" });
// };

// app.use(express.static("dist"));
// app.use(cors());
// app.use(express.json());
// app.use(requestLogger);

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

// const generateId = () => {
//   const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

//   return maxId + 1;
// };

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World!</h1>");
// });

// app.get("/api/notes/", (req, res) => {
//   res.send(notes);
// });

// app.get("/api/notes/:id", (req, res) => {
//   const id = Number(req.params.id);
//   console.log("Getting note with ID: ", id);

//   const note = notes.find((note) => note.id === id);

//   // note ? res.json(note) : res.status(404).end();
//   if (note) {
//     console.log("Found note: ", note);
//     res.json(note);
//   } else {
//     console.log("No note with the ID: ", note);
//     res.status(404).send("Note with requested ID doesn't exist");
//   }
// });

// app.post("/api/notes/", (req, res) => {
//   const noteBody = req.body;

//   if (!noteBody.content) {
//     return res.status(400).json({ error: "Content is required" });
//   }

//   const newNote = {
//     id: generateId(),
//     content: noteBody.content,
//     important: noteBody.important || false,
//   };
//   console.log("Adding new note: ", newNote);

//   notes = notes.concat(newNote);
//   console.log("New note added at ID: ", newNote.id);

//   res.json(newNote);
// });

// app.delete("/api/notes/:id", (req, res) => {
//   const id = Number(req.params.id);
//   console.log("Deleting note with ID: ", id);

//   notes = notes.filter((note) => note.id !== id);
//   console.log("Note deleted with ID: ", id);

//   res.status(204).end();
// });

// app.use(unknownEndpoint);

// const PORT = process.env.PORT || 3002;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// using express with note.js schema
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Note = require("./models/note");
const app = express();

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");

  next();
};

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(express.static("dist"));

let notes = [];

app.get("/api/notes/", (req, res) => {
  Note.find({}).then((notes) => res.json(notes));
});

app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => (note ? res.json(note) : res.status(404).end()))
    // .catch((error) => {
    // console.log(error.message);
    // res.status(400).send({ error: "Malformed ID" });
    // });
    .catch((error) => next(error));
});

app.post("/api/notes", (req, res, next) => {
  const noteBody = req.body;

  if (!noteBody.content) {
    return res.status(400).json({ error: "Content is required" });
  }

  const note = new Note({
    content: noteBody.content,
    important: noteBody.important || false,
  });

  note
    .save()
    .then((savedNote) => res.json(savedNote))
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (req, res, next) => {
  const noteBody = req.body;

  const note = {
    content: noteBody.content,
    important: noteBody.important,
  };

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updatedNote) => res.json(updatedNote))
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformed ID" });
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
