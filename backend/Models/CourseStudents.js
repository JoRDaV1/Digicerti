const mongoose = require("mongoose");

const studentslistDB = new mongoose.Schema({
    coursename:{
        type: String,
        ref:'Certificate'

    },
    issueremail:{
        type: String
    },
    issuername:{
        type: String
    },
    StudentName:{
        type: String
    },
    Grade:{
        type: String
    },
    StudentEmail:{
        type: String
    },

    certificatetype: {
        type: Number,
      },
      Date:{
        type: Date,
        default: Date.now
      }
      ,
      img: {
        type: String,
        default :"image"
      }
   
});

module.exports = mongoose.model("studentslist", studentslistDB);