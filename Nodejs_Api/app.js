const express = require('express');
const app = express();

const feedRouter = require('./routes/feeds.js')

app.use(express.json())

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

app.use('/feeds', feedRouter)

app.listen(8000, () => {
  console.log("server is runing at localhost 8000")
})