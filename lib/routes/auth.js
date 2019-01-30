const { Router } = require('express');
const User = require('../models/User');
const { HttpError } = require('../middleware/error');
const { ensureAuth } = require('../middleware/ensureUser');

const auth = Router()
  .post('/signup', (req, res, next) => {
    const { username, password, profilePhotoUrl } = req.body;
    User.create({ username, password, profilePhotoUrl })
      .then(user => {
        res.send({ user, token: user.authToken() });
      }).catch(next);
  });

module.exports = auth;
