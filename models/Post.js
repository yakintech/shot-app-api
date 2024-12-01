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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WebUser',
    required: true,
  },
});

PostSchema.pre('validate', function (next) {
    if (!this.content && !this.attachUrl) {
      this.invalidate('content', 'At least one of the fields "content" or "attachUrl" must be filled.')
    }
    next();
  });

module.exports = mongoose.model("Post", PostSchema);
