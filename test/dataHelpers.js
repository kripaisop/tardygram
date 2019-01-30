require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const seedData = require('./seedData');
const Post = require('../lib/models/Post');
const User = require('../lib/models/User');

const request = require('supertest');
const app = require('../lib/app');

beforeAll(() => {
  connect();
});

beforeEach(done => {
  mongoose.connection.dropDatabase(done);
});

beforeEach(() => {
  return seedData({ totalUsers: 3, totalTweets: 5 });
});

let token;
beforeEach(() => {
  return User.findOne({ username: 'person1' })
    .then(user => {
      return request(app)
        .post('/auth/signin')
        .send({
          email: user.email,
          password: 'password'
        });
    })
    .then(res => {
      token = res.body.token;
    });
});

afterAll(done => {
  mongoose.connection.close(done);
});
