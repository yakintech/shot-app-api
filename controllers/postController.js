const Post = require("../models/Post");
const WebUser = require("../models/WebUser");

exports.createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const user = await WebUser.findOne({ supabaseId: userId });

    const attachUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const newPost = await Post.create({ content, attachUrl, user: user._id });

    await WebUser.findOneAndUpdate(
      { supabaseId: userId },
      { $push: { posts: newPost._id } }
    );

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "user",
        select: "firstName lastName username image",
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
