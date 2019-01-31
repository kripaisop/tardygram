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
  })
  .delete('/:id', (req, res, next) => {
    Comment
      .findByIdAndDelete(req.params.id)
      .then((deletedComment) => {
        res.send(deletedComment);
      }).catch(next);
  });


module.exports = comments;
