const Post = require('../lib/models/Post');
const User = require('../lib/models/User');
const Chance = require('chance');
const chance = new Chance();

const DEFAULT_TOTAL_USERS = 10;
const DEFAULT_TOTAL_POSTS = 100;

const profPic = 'https://media.mnn.com/assets/images/2013/02/grumpycat.jpg.560x0_q80_crop-smart.jpg';

const seedData = (totalUsers = DEFAULT_TOTAL_USERS, totalPosts = DEFAULT_TOTAL_POSTS) => {
  return Promise.all(
    [...Array(totalUsers)].map((el, index) => {
      return User.create({ username: `person${index}`, password: 'password', profilePhotoUrl: profPic });
    })
  )
    .then(users => {
      return Promise.all(
        [...Array(totalPosts)].map(() => {
          return Post.create({ user: chance.pickone(users)._id, photoUrl: `${profPic}`, caption: 'yolo 420 cats be taking over', tags: ['#yolo', '#cats', '#420', '#blessed'] });
        })
      );
    });
};

module.exports = seedData;
