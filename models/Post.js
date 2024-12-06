const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
  },
  attachUrl: {
    type: String,
  },
  user: {
    type: String,
    ref: 'WebUser',
    required: true,
  },
  likedBy: [{
    type: String,
    ref: 'WebUser',
  }],
  likeCount:{
    type: Number,
    default: 0,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

PostSchema.pre('validate', function (next) {
    if (!this.content && !this.attachUrl) {
      this.invalidate('content', 'At least one of the fields "content" or "attachUrl" must be filled.')
    }
    next();
  });

module.exports = mongoose.model("Post", PostSchema);
