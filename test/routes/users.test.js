require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');

describe('users', () => {
  it('can get users with the most posts', () => {
    return request(app)
      .get('/users/prolific')
      .then(({ body }) =>  {
        expect(body).toEqual(expect.any(Array));
        expect(body[0].user[0]).toEqual({
          __v: 0,
          _id: expect.any(String),
          username: expect.any(String),
          passwordHash: expect.any(String),
          profilePhotoUrl: expect.any(String)
        });
      });
  });

  it('can get a list of 10 users with most comments on their posts', () => {
    return request(app)
      .get('/users/popular')
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  it('can get the /leader route', () => {
    return request(app)
      .get('/users/leader')
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  it('can get the /impact route', () => {
    return request(app)
      .get('/users/impact')
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  afterAll((done) => {
    return mongoose.connection.close(done);
  }); 
});
