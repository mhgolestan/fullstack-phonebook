const mongoose = require("mongoose");

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Must be at least 3 characters"], // changed the error message
    required: true,
  },
  phone: {
    type: String,
    minLength: [8, "Must be at least 8 digits"],
    // validate: {
    //   validator: function (v) {
    //     return /[0-9]{2,3}[-][0-9]{5,10}/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid phone number!`,
    // },
    required: [true, "User phone number required"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
