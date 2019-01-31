const { Router } = require('express');
const Post = require('../models/Post');

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
  });

module.exports = posts;
