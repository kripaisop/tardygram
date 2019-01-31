const { Router } = require('express');
const Comment = require('../models/Comment');
const { HttpError } = require('../middleware/error');

const comments = Router()
  .post('/', (req, res, next) => {

  });


module.exports = comments;
