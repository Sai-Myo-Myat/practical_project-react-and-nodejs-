const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const multer = require('multer');
const uuidV4 = require('uuid').v4;

const feedRouter = require('./routes/feed.js')

require('dotenv').config();

const fileStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,"images")
  },
  filename: (req,file,cb) => {
    cb(null, uuidV4() + "-" + file.originalname);
  }
});

const fileFilter = (req,file,cb) => {
  if(
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" 
  ){
    cb(null,true)
  }else {
    console.log("something went wrong ")
    cb(null,false)
  }
}

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

app.use(express.json());
app.use("/images",express.static(path.join(__dirname, "images")));
app.use("/",multer({
  storage: fileStorage, 
  fileFilter: fileFilter
}).single('image'));

app.use('/feed', feedRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({message: message})
}); 

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
    app.listen(8000);
  })
  .catch(err => console.log(err))