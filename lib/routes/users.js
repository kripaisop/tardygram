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
  })
  .get('/leader', (req, res, next) => {
    Comment
      .getUsersWithMostComments()
      .then(users => {
        res.send(users);
      })
      .catch(next);
  })
  .get('/impact', (req, res, next) => {
    Comment
      .getImpactfulUsers()
      .then(users => {
        res.send(users);
      })
      .catch(next);
  });

module.exports = users;
