const mongoose = require("mongoose");

const CertificationsDB = new mongoose.Schema({
  issueremail: {
    type: String,
    required: true,
  },

  coursename: {
    type: String,
    required: true,
    unique: true,
  },

  issuername: {
    type: String,
    required: true,
  },
  certificatetype: {
    type: String,
    required: true,
  }
 

});

module.exports = mongoose.model("Certifications", CertificationsDB);
