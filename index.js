require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

/* morgan logger 
app.use(
  morgan(
    ":method :url HTTP/:http-version :status  :res[content-length] - :response-time ms :param"
  )
);
morgan.token("param", (req, res, param) => {
  return JSON.stringify(req.body);
});
*/

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
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/info/", (req, res) => {
  res.send(`<p>number of people ${persons.length}</p>
            <p>request was sent ${new Date()}</p>
  `);
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
  // const id = Number(req.params.id);
  // const person = persons.find((person) => person.id == id);
  // if (person) {
  //   res.json(person);
  // } else {
  //   res.status(404).end();
  // }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  console.log(persons.filter((person) => person.id !== id));
  res.json(persons.filter((person) => person.id !== id));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body.name);
  if (body.name === undefined) {
    return res.status(400).json({ error: "content missing" });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });

  // const id = Math.floor(Math.random() * 100);
  // const name = req.body.name;
  // const number = req.body.number;
  // const nameExists = persons.filter((person) => person.name === name).length;
  // const numberExists = persons.filter(
  //   (person) => person.number === number
  // ).length;
  // if (!nameExists && !numberExists) {
  //   const person = {
  //     id: id,
  //     name: name,
  //     number: number,
  //   };
  //   persons.push(person);
  //   res.json(persons);
  // } else {
  //   res.status(404);
  //   res.json({ error: "name must be unique" }).end();
  // }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
