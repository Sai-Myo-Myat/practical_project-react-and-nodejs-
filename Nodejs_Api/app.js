const express = require('express');
const app = express();
const mongoose = require('mongoose')

const feedRouter = require('./routes/feed.js')

require('dotenv').config();

app.use(express.json())

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

app.use('/feed', feedRouter)

mongoose
  .connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(result => {
    console.log("connected with database")
    app.listen(8000)
  })
  .catch(err => console.log(err))