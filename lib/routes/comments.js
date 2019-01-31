const { Router } = require('express');
const Comment = require('../models/Comment');
// const { HttpError } = require('../middleware/error');

const comments = Router()
  .post('/', (req, res, next) => {
    const { commentBy, post, comment } = req.body;
    Comment
      .create({
        commentBy, 
        post, 
        comment
      })
      .then(comment => {
        res.send(comment);
      })
      .catch(next);
  });


module.exports = comments;
