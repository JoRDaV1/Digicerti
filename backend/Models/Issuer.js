const mongoose = require("mongoose");

const IssuerDB = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  mobile: {
    type: Number,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  noofcourses: {
    type: Number,
  },
  noofstudents: {
    type: Number,
  },
});

module.exports = mongoose.model("Issuer", IssuerDB);
