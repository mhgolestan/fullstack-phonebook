const mongoose = require("mongoose");

// if (process.argv.length < 5) {
//   console.log(
//     "Please provide the password as an argument: node mongo.js <password> <name> <number>"
//   );
//   process.exit(1);
// }

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://mohammad:${password}@cluster0.x2wiz.mongodb.net/persons_app?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

//// save data to db

const note = new Person({
  name: name,
  number: number,
});

note.save().then((result) => {
  console.log("person saved!");
  mongoose.connection.close();
});

//// fetch data
Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
