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

const groupByPost = () => ({ $group: { _id: '$post', count: { $sum: 1 } } });
const sortByDesc = () => ({ $sort: { count: -1 } });
const limitBy10 = () => ({ $limit: 10 });

commentSchema.statics.mostComments = function() {
  return this.aggregate([
    groupByPost(),
    sortByDesc(),
    limitBy10()
  ]);
};

commentSchema.statics.getPopularUsers = function() {
  return this.aggregate([
    {
      '$group': {
        '_id': '$post', 
        'commentCount': {
          '$sum': 1
        }
      }
    }, {
      '$lookup': {
        'from': 'posts', 
        'localField': '_id', 
        'foreignField': '_id', 
        'as': 'post'
      }
    }, {
      '$sort': {
        'commentCount': -1
      }
    }, {
      '$limit': 10
    }, {
      '$lookup': {
        'from': 'users', 
        'localField': 'post[0].user', 
        'foreignField': '_id>', 
        'as': 'user'
      }
    }]);
};

module.exports = mongoose.model('Comment', commentSchema);
