const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getUserPosts);
router.post("/", postController.createPost);
router.get("/detail/:id", postController.getPostById);

module.exports = router;
