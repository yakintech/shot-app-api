const Post = require("../models/Post");
const WebUser = require("../models/WebUser");
const mongoose = require("mongoose");

const likeController = {
  addLike: async (req, res) => {
    const { postId, userId } = req.body;

    const user = await WebUser.findOne({ supabaseId: userId });

    try {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (!post.likedBy) {
        post.likedBy = [];
      }

      if (!post.likedBy.includes(userId)) {
        post.likedBy.push(userId);
        post.likeCount = (post.likeCount || 0) + 1;
        await post.save();


        return res
          .status(200)
          .json({ message: "Post liked successfully", post: post._id });
      } else {
        return res.status(400).json({ message: "Post already liked" });
      }
    } catch (error) {
      console.log(
        `Error liking post addLike postId: ${postId} userId:${userId}`,
        error
      );
      return res.status(500).json({ message: "Error liking post", error });
    }
  },

  removeLike: async (req, res) => {
    const { postId, userId } = req.body;

    try {
      const user = await WebUser.findOne({ supabaseId: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (!post.likedBy) {
        post.likedBy = [];
        return res.status(400).json({ message: "Post not liked yet" });
      }

      if (post.likedBy.includes(userId)) {
        console.log("post.likedBy", post.likedBy);
        post.likedBy = post.likedBy.filter((id) => id !== userId);
        post.likeCount = Math.max(0, (post.likeCount || 1) - 1);
        await post.save();

        return res
          .status(200)
          .json({ message: "Post unliked successfully", post: post });
      } else {
        return res.status(400).json({ message: "Post not liked yet" });
      }
    } catch (error) {
      console.log(
        `Error unliking post removeLike postId: ${postId} userId:${userId}`,
        error
      );
      return res.status(500).json({ message: "Error unliking post", error });
    }
  },

  getLikesWithUser: async (req, res) => {
    try {
      const { id } = req.params;
      const posts = await Post.find({ likedBy: id })
        .populate({
          path: "user",
          select: "firstName lastName username image",
        })
        .sort({ timestamp: -1 });
      return res.status(200).json(posts);
    } catch (error) {
      console.log("Error fetching likes getLikesWithUser", error);
      return res.status(500).json({ message: "Error fetching likes", error });
    }
  },

  checkLikeStatus: async (req, res) => {
    try {
      const { postId, userId } = req.params;

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const isLiked = post.likedBy?.includes(userId) || false;
      return res.status(200).json({ isLiked });
    } catch (error) {
      console.log("Error checking like status", error);
      return res
        .status(500)
        .json({ message: "Error checking like status", error });
    }
  },
};

module.exports = likeController;
