const mongoose = require('mongoose');
const Schema = mongoose.Schema;

commentSchema = new Schema({
  text: {
    type: String,
    required: 'Comment text is required'
  },
  sneaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sneaker',
    required: 'Comment sneaker is required'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Comment author is required'
  }
},{
  timestamps: true,
  toJSON: {
    virtals: true, 
    transform: function (dec, ret) {
      delete ret.__v;
      ret.id = ret._id
      delete ret._id
      return ret;
    }
  }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;