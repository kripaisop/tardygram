require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../lib/app');
const Post = require('../../lib/models/Post');
const { getUser, getPost, getPosts } = require('../dataHelpers');

const profPic = 'https://media.mnn.com/assets/images/2013/02/grumpycat.jpg.560x0_q80_crop-smart.jpg';

describe.only('posts', () => {
  it('can post a new post from a user', () => {
    return getUser()
      .then(user => {
        console.log('PUT A LABEL ON IT', user);
        return request(app)
          .post('/posts')
          .send({
            user: user._id,
            photoUrl: profPic,
            caption: 's lit',
            tags: ['#litty', '#blessed']
          });
      }).then(res => {
        console.log(res.body);
      });
  });
});
