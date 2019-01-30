require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../lib/app');
const Post = require('../../lib/models/Post');
const { getUser, getPost, getPosts, getToken } = require('../dataHelpers');

const profPic = 'https://media.mnn.com/assets/images/2013/02/grumpycat.jpg.560x0_q80_crop-smart.jpg';

describe.only('posts', () => {
  it('can post a new post from a user', () => {
    return getUser({ username: 'person0' })
      .then(user => {
        return request(app)
          .post('/posts')
          .set('Authorization', `Bearer ${getToken()}`)
          .send({
            user: user._id,
            photoUrl: profPic,
            caption: 's lit',
            tags: ['#litty', '#blessed'],
          });
      }).then(res => {
        expect(res.body).toEqual({
          photoUrl: profPic,
          caption: 's lit',
          tags: ['#litty', '#blessed'],
          __v: 0,
          _id: expect.any(String)
        });
      });
  });
});
