const { Router } = require('express');
const Post = require('../models/Post');
// const { HttpError } = require('../middleware/error');
// const { ensureAuth } = require('../middleware/ensureUser');

const posts = Router()
  .post('/', (req, res, next) => {
    const { username, photoUrl, caption, tags } = req.body;
    Post.create({ username, photoUrl, caption, tags })
      .then(post => {
        res.send(post);
      }).catch(next);
  });

module.exports = posts;
