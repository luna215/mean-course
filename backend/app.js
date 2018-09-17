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
  res.setHeader(
    'Access-Control-Allow-Origin', '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  post.save()
      .then(createdPost => {
        res.status(201).json({
          message: 'Post was added successfully',
          postId: createdPost._id
        });
      });
});

app.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post)
      .then(result => {
        res.status(200).json({message: 'Updated post successfully'});
      });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
      .then(documents => {
        res.status(200).json({
          message: 'Posts fetched successfully.',
          posts: documents,
        });
      });
});

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'Post not found'});
    }
  })
})

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Post was deleted' });
  });
});



 module.exports = app;

