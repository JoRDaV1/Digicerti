const mongoose = require("mongoose");

const blockinfo = new mongoose.Schema({
    id: {
    type: String,
    required: true,
    },
blocknumber : {
    type: Number,
    required: true,
    },
blockhash : {
    type: String,
    required: true,
    },


});

module.exports = mongoose.model("Block", blockinfo);
