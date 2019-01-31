require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');

const app = require('../../lib/app');

describe('users', () => {
  it('can get users with the most posts', () => {
    return request(app)
      .get('/users/prolific')
      .then(res =>  {
        console.log('res!!!!!!!', res.body);
      });
  });
});
