const Post = require("../models/Post");

 const likeController = {
    addLike: async (req, res) => {
        const { postId, userId } = req.body;

        try {
            const post = await Post.findById(postId);

            if (!post.likedBy.includes(userId)) {
                post.likedBy.push(userId);
                post.likeCount += 1;
                await post.save();
                return res.status(200).json({ message: "Post liked successfully", post });
            } else {
                return res.status(400).json({ message: "Post already liked" });
            }
        } catch (error) {
            console.log(`Error liking post addLike postId: ${postId} userId:${userId}`, error);
            return res.status(500).json({ message: "Error liking post", error });
        }
    },
    removeLike: async (req, res) => {
        const { postId, userId } = req.body;

        try {
            const post = await Post.findById(postId);

            if (post.likedBy.includes(userId)) {
                post.likedBy = post.likedBy.filter((id) => id != userId);
                console.log("post.likedBy",post.likedBy);
                post.likeCount -= 1;
                await post.save();
                res.status(200).json({ message: "Post unliked successfully", post });
            } else {
                res.status(400).json({ message: "Post not liked yet" });
            }
        } catch (error) {
            console.log(`Error unliking post removeLike postId: ${postId} userId:${userId}`, error);
            res.status(500).json({ message: "Error unliking post", error });
        }
    },
    getLikesWithUser: async (req, res) => {
        try {
            const { id } = req.params;
            const posts = await Post.find({ likedBy: id });
            return res.status(200).json(posts);
        } catch (error) {
            console.log("Error fetching likes getLikesWithUser", error);
            return res.status(500).json({ message: "Error fetching likes", error });
        }
    }

}


module.exports = likeController;