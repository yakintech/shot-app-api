const express = require("express");

const commentController = require("../controllers/commentController");
const router = express.Router();

router.post("/", commentController.add);
router.get("/getByUserId/:id", commentController.getByUserId);
router.get("/getByPostId/:id", commentController.getByPostId);


module.exports = router;