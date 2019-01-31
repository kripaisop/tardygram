const { Router } = require('express');
const Post = require('../models/Post');
const { HttpError } = require('../middleware/error');

const patcher = (body, fields) => {
  return Object.keys(body)
    .reduce((acc, key) => {
      if(fields.includes(key) && body[key]) {
        acc[key] = body[key];
      }
      return acc;
    }, {});
};

const posts = Router()
  .post('/', (req, res, next) => {
    const { username, photoUrl, caption, tags } = req.body;
    Post.create({ username, photoUrl, caption, tags })
      .then(post => {
        res.send(post);
      }).catch(next);
  })
  .get('/', (req, res, next) => {
    Post
      .find()
      .populate('user', { username: true })
      .select('-__v -_id')
      .then(posts => res.send(posts))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Post
      .findById(req.params.id)
      .populate('user', { username: true })
      .select('-__v -_id')
      .then(post => res.send(post))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const patched = patcher(req.body, ['caption']);
    Post
      .findByIdAndUpdate(req.params.id, patched, { new: true })
      .populate('user', { username: true })
      .select('-__v -_id')
      .then(post => res.send(post))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Post 
      .findByIdAndDelete(req.params.id)
      .then(() => {
        res.send({ deleted: 1 });
      })
      .then(() => {
        next(new HttpError(404, 'Not found'));
      })
      .catch(next);
  });

module.exports = posts;
