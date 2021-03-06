require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const seedData = require('./seedData');
const Post = require('../lib/models/Post');
const User = require('../lib/models/User');
const Comment = require('../lib/models/Comment');

const request = require('supertest');
const app = require('../lib/app');

beforeAll(() => {
  return connect();
});

beforeEach(done => {
  return mongoose.connection.dropDatabase(done);
});

beforeEach(() => {
  return seedData({ totalUsers: 3, totalPosts: 5, totalComments: 15 });
});

let token;
beforeEach(() => {
  return User.findOne({ username: 'person0' })
    .then(user => {
      return request(app)
        .post('/auth/signin')
        .send({
          username: user.username,
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

const prepare = model => JSON.parse(JSON.stringify(model));
const prepareAll = models => models.map(prepare);

const createGetters = Model => {
  return {
    [`get${Model.modelName}`]: (query = {}) => Model.findOne(query).then(prepare),
    [`get${Model.modelName}s`]: (query = {}) => Model.find(query).then(prepareAll),    
  };
};

module.exports = {
  ...createGetters(User),
  ...createGetters(Post),
  ...createGetters(Comment),
  getToken: () => token
};
