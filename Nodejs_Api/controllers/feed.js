const PostModel = require("../models/post")

exports.getPosts = (req,res,next) => {
  res.status(200).json({
    posts: [
      {
        _id: 1,
        title: "content one",
        content: "This is content one ",
        imageUrl: "images/js.jpg",
        creator: {
          name: "mg mg"
        },
        creactAt: new Date()
      },
    ]
  })
}

const { validationResult } = require('express-validator')

exports.createPost = (req,res,next) => {
  const errors = validationResult(req);
  const title = req.body.title;
  const content = req.body.content;
  console.log(title,content)

  if(!errors.isEmpty()) {
    const error = new Error("Validation failed, entered values are incorrect");
    error.statusCode = 422;
    throw error;
  }

  const post = new PostModel({
    title: title,
    content: content,
    imageUrl: "images/js.jpg",
    creator: {name: "mg mg"},
  })
  post.save()
    .then(result => {
      console.log(result, "posts")
      res.status(201).json({
        message: "post created successfully", 
        post: result
      })
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    })
}