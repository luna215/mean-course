const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post was added successfully'
  });
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'asds1afdsfgf',
      title: 'First post',
      content: 'this is coming from the server side'
    },
    {
      id: 'asds1afdsfgf',
      title: 'Second post',
      content: 'this is coming from the server side!'
    }
  ];

  res.status(200).json({
    message: 'Posts fetched successfully.',
    posts: posts,
  });

});



 module.exports = app;

