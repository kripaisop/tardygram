const { Router } = require('express');
const Comment = require('../models/Comment');
const { HttpError } = require('../middleware/error');
const { ensureAuth } = require('../middleware/ensureUser');

const users = Router()
  .get('/users/popular', (req, res, next) => {
    Comment
      .mostComments()
      .then(most => {
        res.send(most);
      })
      .catch(next);
  });

module.exports = users;
