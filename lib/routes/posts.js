const { Router } = require('express');
const Post = require('../models/Post');
const { HttpError } = require('../middleware/error');
const { ensureAuth } = require('../middleware/ensureUser');

const posts = Router()
  .post('/posts', )