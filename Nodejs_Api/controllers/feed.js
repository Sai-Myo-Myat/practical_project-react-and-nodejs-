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
    return res.status(422).json({
      message: "Validation failed, entered values are incorrect",
      errors: errors.array()
    })
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
    .catch(err => console.log(err))
}