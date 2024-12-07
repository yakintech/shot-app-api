const Post = require("../models/Post");
const WebUser = require("../models/WebUser");

exports.createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const user = await WebUser.findOne({ supabaseId: userId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const newPost = await Post.create({ content, user: userId });

    await WebUser.findOneAndUpdate(
      { supabaseId: userId },
      { $push: { posts: newPost._id } }
    );

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost._id });
  } catch (error) {
    console.log("Create Post Error: ", error);
    res.status(500).json({ message: "Error creating post", error });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    let posts = await Post.find()
      .populate({
        path: "user",
        match: { supabaseId: { $exists: true } },
        options: { strictPopulate: false },
        localField: 'user',
        foreignField: 'supabaseId'
      })
      .sort({ timestamp: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all posts", error });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    var id = req.params.id;

    const user = await WebUser.findOne({ supabaseId: id });

    const posts = await Post.find({ user: user._id }).populate({
      path: "user",
      select: "firstName lastName username image",
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user posts", error });
  }
};

exports.getPostById = async (req, res) => {
  try {
    let posts = await Post.findOne({ _id: req.params.id })
      .populate({
        path: "user",
        match: { supabaseId: { $exists: true } },
        options: { strictPopulate: false },
        localField: 'user',
        foreignField: 'supabaseId'
      })
      .sort({ timestamp: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all posts", error });
  }
}
