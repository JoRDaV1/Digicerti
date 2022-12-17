const express = require('express')
var cors = require('cors') 
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/SSIPHackathon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const app = express()
const port = 6000

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))


app.listen(port, () => {
  console.log(`Digicerti backend listening at http://localhost:${port}`)
})