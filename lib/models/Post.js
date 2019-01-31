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

const Post = mongoose.model('Post', postSchema);

// Post.statics.mostComments = function(){
//   return this.aggregate([

//   ])
// }

module.exports = Post;
