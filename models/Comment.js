const { default: mongoose } = require("mongoose");

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WebUser',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
},
    {
        timestamps: true,
    });


module.exports = mongoose.model("Comment", CommentSchema);

