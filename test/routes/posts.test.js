require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');
const Post = require('../../lib/models/Post');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const profPic = 'https://media.mnn.com/assets/images/2013/02/grumpycat.jpg.560x0_q80_crop-smart.jpg';

const signIn = () => {
  return createUser('bieberfever4ever')
    .then(user => {
      return request(app)
        .post('/signin')
        .send({ username: user.username, password: 'password' })
        .then(res => res.body);
    });
};

const createUser = username => {
  return request(app)
    .post('/signup')
    .send({
      username: username,
      password: 'password',
      profilePhoto: profPic
    })
    .then(res => res.body);
};


describe.only('posts', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('can post a new post from a user', () => {
    return createUser('luvrboi')
      .then(user => {
        return request(app)
          .post
      })
  })
});
