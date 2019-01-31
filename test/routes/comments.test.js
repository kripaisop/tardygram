require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');

const app = require('../../lib/app');
const { getUser, getPost, getToken, getComment } = require('../dataHelpers');

describe('comments', () => {
  it('can post a comment', () => {
    return getUser({ username: 'person0' })
      .then(user => {
        return getPost()
          .then(post => {
            return Promise.all([
              Promise.resolve(post),
              request(app)
                .get(`/posts/${post._id}`)
                .set('Authorization', `Bearer ${getToken()}`)
            ]);
          })
          .then(([post, res]) => {
            // console.log(res.body, 'RES!!!!!!!!!');
            return request(app)
              .post('/comments')
              .send({ commentBy: user._id, post: post._id, comment: 'blessed up bb' })
              .set('Authorization', `Bearer ${getToken()}`)
              .then(res => {
                expect(res.body).toEqual({ 
                  commentBy: user._id, 
                  post: post._id, 
                  comment: 'blessed up bb', 
                  _id: expect.any(String),
                  __v: 0
                });
              });
          });
      });
  });

  it('can delete a comment', () => {
    return getUser({ username: 'person0' })
      .then(user => {
        return getPost()
          .then(post => {
            return Promise.all([
              Promise.resolve(post),
              request(app)
                .get(`/posts/${post._id}`)
                .set('Authorization', `Bearer ${getToken()}`)
            ]);
          })
          .then(([post, res]) => {
            return getComment()
              .then(comment => {
                return Promise.all([
                  Promise.resolve(comment),
                  request(app)
                    .delete(`/comments/${comment._id}`)
                    .set('Authorization', `Bearer ${getToken()}`)
                ])
                  .then(([deletedComment, res]) => {
                    expect(res.body).toEqual({ deleted: 1 });
                  });
              });
          });
      });
  });
});
