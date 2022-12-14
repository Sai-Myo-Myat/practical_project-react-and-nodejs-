const express = require('express');
const router = express.Router();
const  { body }= require("express-validator")

const feedController = require('../controllers/feed.js');

router.get('/posts',feedController.getPosts
);

router.get("/posts/:postId", feedController.getOnePost);

router.post('/post',
  [
    body("title")
      .trim()
      .isLength({min: 5}),
    body("content")
      .trim()
      .isLength({min: 5})
  ], feedController.createPost
);

router.put("/post/:postId", (req,res,next) => {
  [
    body("title")
      .trim()
      .isLength({min:5}),
    body("content")
      .trim()
      .isLength({min:5})
  ],feedController.updatePost
})

module.exports = router;