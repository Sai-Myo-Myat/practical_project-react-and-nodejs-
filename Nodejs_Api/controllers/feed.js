const PostModel = require("../models/post")
const { validationResult } = require('express-validator');
const fs  = require('fs');
const path = require("path");

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


exports.createPost = (req,res,next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    const error = new Error("Validation failed, entered values are incorrect");
    error.statusCode = 422;
    throw error;
  }

  if(!req.file) {
    const error = new Error("file not found");
    error.statusCode = 422;
    throw error;
  }
  
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.file.path.replace('\\', "/")

  const post = new PostModel({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: {name: "mg mg"},
  })
  post.save()
    .then(result => {
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

exports.updatePost = (req,res,next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    const error = new Error("Validation failed, entered values are incorrect");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;

  if(req.file) {
    imageUrl = req.file.path.replace("\\","/");
  }

  if(!imageUrl) {
    const error = new Error("No file picked!");
    error.statusCode = 422;
    throw error;
  }

  PostModel.findById(postId)
    .then(post => {
      if(!post) {
        const error = new Error("Post not found.");
        error.statusCode = 404;
        throw error;
      }
      if(imageUrl !== post.imageUrl){
        clearImage(post.imageUrl);
      }
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then(result => {
      res.status(200).json({
        message: "post updated",
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

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath);
}