const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const postsRoutes = require('./routes/posts');

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

app.use('/api/posts', postsRoutes);


 module.exports = app;

