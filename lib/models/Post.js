const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  photoUrl: {
    type: String,
    required: true
  },
  caption:{
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);
