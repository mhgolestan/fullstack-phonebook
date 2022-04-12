const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.use(
  morgan(
    ":method :url HTTP/:http-version :status  :res[content-length] - :response-time ms :param"
  )
);

morgan.token("param", (req, res, param) => {
  return JSON.stringify(req.body);
});

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
  //   res.send("Hello World!");
});

app.get("/api/info/", (req, res) => {
  res.send(`<p>number of people ${persons.length}</p>
            <p>request was sent ${new Date()}</p>
  `);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id == id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  console.log(persons.filter((person) => person.id !== id));
  res.json(persons.filter((person) => person.id !== id));
});

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * 100);
  const name = req.body.name;
  const number = req.body.number;
  const nameExists = persons.filter((person) => person.name === name).length;
  const numberExists = persons.filter(
    (person) => person.number === number
  ).length;
  if (!nameExists && !numberExists) {
    const person = {
      id: id,
      name: name,
      number: number,
    };
    persons.push(person);
    res.json(persons);
  } else {
    res.status(404);
    res.json({ error: "name must be unique" }).end();
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
