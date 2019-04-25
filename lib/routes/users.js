const { Router } = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const users = Router()
  .get('/prolific', (req, res, next) => {
    Post
      .getProlificUsers()
      .then(users => {
        res.send(users);
      })
      .catch(next);
  })
  .get('/popular', (req, res, next) => {
    Comment
      .getPopularUsers()
      .then(users => {
        res.send(users);
      })
      .catch(next);
  });

module.exports = users;
