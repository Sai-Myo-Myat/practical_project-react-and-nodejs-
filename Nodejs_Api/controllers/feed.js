const PostModel = require("../models/post")

exports.getPosts = (req,res,next) => {
  PostModel.find()
    .then(resData => {
      res.status(200).json({
        message: "fetched posts successfully",
        posts: resData
      })
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

const { validationResult } = require('express-validator')

exports.createPost = (req,res,next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    const error = new Error("Validation failed, entered values are incorrect");
    error.statusCode = 422;
    throw error;
  }

  // if(!req.file) {
  //   const error = new Error("file not found");
  //   error.statusCode = 422;
  //   throw error;
  // }
  
  const title = req.body.title;
  const content = req.body.content;
  // const imageUrl = req.file.path.replace('\\', "/")
  console.log("req body", req.body)

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

exports.getOnePost = (req,res,next) => {
  const postId = req.params.postId;
  PostModel.findById(postId)
    .then(post => {
      if(!post) {
        const error = new Error("Post not found");
        error.statusCode = 404;
        throw error;
      } 
      res.status(200).json({
        message: "fetched post successfully",
        post: post
      })
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err)
    })
}