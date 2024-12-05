const Comment = require("../models/Comment");
const Post = require("../models/Post");
const WebUser = require("../models/WebUser");


const commentController = {
    add: async (req, res) => {
        let userId = req.body.userId;
        let postId = req.body.postId;
        let content = req.body.content;
        try {

            //bir kullanıcı 3ten fazla yorum yapamaz
            const commentCount = await Comment.find({ userId: userId });
            if (commentCount.length >= 3) {
                return res.status(400).json({ message: "You can't add more than 5 comments" });
            }

            //bu idye sahip user var yoksa hata döndür
            const user = await WebUser.findById(userId);
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            //bu idye sahip post yoksa hata döndür
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(400).json({ message: "Post not found" });
            }

            const comment = new Comment({
                userId: userId,
                content: content,
                post: postId
            });
            await comment.save();

            post.comments.push(comment._id);
            await post.save();
            return res.status(201).json(comment);
        } catch (error) {
            console.log(`Error adding comment userId: ${userId} content: ${content}`, error);
            return res.status(400).json(error);
        }
    },
    getByUserId: async (req, res) => {
        let userId = req.params.id;
        try {
            const comments = await Comment.find({ userId: userId });
            return res.status(200).json(comments);
        } catch (error) {
            console.log(`Error fetching comments getByUserId ${req.params.id}`, error);
            return res.status(400).json(error);
        }
    },
    getByPostId: async (req, res) => {
        let postId = req.params.id;
        try {
            const comments = await Comment.find({ post: postId });
            return res.status(200).json(comments);
        } catch (error) {
            console.log(`Error fetching comments getByPostId ${req.params.id}`, error);
            return res.status(400).json(error);
        }
    },
}


module.exports = commentController;