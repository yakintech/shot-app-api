const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const multer = require('../middlewares/upload');

router.get("/", postController.getAllPosts);
router.post("/create", multer.single("file"), postController.createPost);

module.exports = router;
