const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const Post = require('./models/post');

app.use(bodyParser.json())

mongoose.connect('mongodb+srv://paul:YU8vMTDf0EfIAgcw@cluster0-xbk8i.mongodb.net/test?retryWrites=true')
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed.');
  });

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
   "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept"
   );
   res.setHeader(
     "Allow-Control-Allow-Mehtods",
     "GET, POST, PATCH, DELETE, OPTIONS"
    );

   next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  post.save();
  res.status(201).json({
    message: 'Post was added successfully'
  });
});

app.use('/api/posts', (req, res, next) => {
  Post.find()
      .then(documents => {
        res.status(200).json({
          message: 'Posts fetched successfully.',
          posts: documents,
        });
      });
});



 module.exports = app;

