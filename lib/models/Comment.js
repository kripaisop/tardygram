const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  comment: {
    type: String,
    maxlength: 280,
    required: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
