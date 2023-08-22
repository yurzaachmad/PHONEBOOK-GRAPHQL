const { Schema, model } = require("mongoose");

const phoneSchema = new Schema({
  name: String,
  phone: String,
  avatar: {
    type: String,
    default: null,
  },
});

module.exports = model("Phonebook", phoneSchema);
