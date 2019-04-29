const { Router } = require('express');
const Comment = require('../models/Comment');
const HttpError = require('../middleware/error');

const comments = Router()
  .post('/', (req, res, next) => {
    const { post, comment } = req.body;
    Comment
      .create({
        commentBy: req.user._id, 
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
      .findById(req.params.id)
      .then(comment => {
        if(comment.commentBy.toString() === req.user._id) {
          Comment
            .findByIdAndDelete(req.params.id)
            .then((deletedComment) => {
              res.send(deletedComment);
            }).catch(next);
        }
        else {
          new HttpError(401, 'you do not own this comment');
        }
      }).catch(next);
  });

module.exports = comments;
