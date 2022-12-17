const mongoose = require("mongoose");

const UserDB = new mongoose.Schema({
	fname: {
        type: String, required: true
    },

    lname:String,

    email:{
        type: String, required: true, unique:true
    },

    mobile:{
        type: Number, required: true
    },

    password:{
        type: String, required:true
    },
    noofcertifications : {
        type: Number
    },
    noofissuers:{
        type: Number
    }
});

module.exports = mongoose.model("User", UserDB);

