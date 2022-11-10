exports.getPosts = (req,res,next) => {
  res.status(200).json({
    posts: [
      {
        title: "content one",
        content: "This is content one "
      }
    ]
  })
}

exports.createPost = (req,res,next) => {
  const title = req.body.title;
  const content = req.body.content;
  console.log(title,content)
  //storing into db
  res.status(201).json({
    message: "post created successfully", 
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content
    }
  })
}