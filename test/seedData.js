const Post = require('../lib/models/Post');
const User = require('../lib/models/User');
const Chance = require('chance');
const chance = new Chance();

const users = [...Array(10)];
const posts = [...Array(100)];

const mongoose = require('mongoose');
mongoose.connection.dropDatabase();

const profPic = 'https://media.mnn.com/assets/images/2013/02/grumpycat.jpg.560x0_q80_crop-smart.jpg';


const seedData = () => {
  return Promise.all(
    users.map((el, index) => {
      return User.create({ username: `person${index}`, password: 'password', profilePhotoUrl: profPic });
    })
  )
    .then(users => {
      return Promise.all(
        posts.map(() => {
          return Post.create({ user: chance.pickone(users)._id, photoUrl: `${profPic}`, caption: 'yolo 420 cats be taking over', tags: ['#yolo', '#cats', '#420', '#blessed'] });
        })
      );
    }
    );
};

module.exports = seedData;
