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
  })
  .post('/signin', (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username })
      .then(user => {
        if(!user) {
          next(new HttpError(401, 'Bad email or password'));
        }
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ]);
      }).then(([user, passwordCorrect]) => {
        if(passwordCorrect) {
          res.send({ user, token: user.authToken() });
        }
        else {
          next(new HttpError(401, 'Bad email or password'));
        }
      })
      .catch(next);
  })
  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user);
    next();
  });

module.exports = auth;
