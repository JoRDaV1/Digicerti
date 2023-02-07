const mongoose = require('mongoose')

const blockinfo = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },

  transhash: {
    type: String,
    required: true,
  },
  chainId: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Block', blockinfo)
