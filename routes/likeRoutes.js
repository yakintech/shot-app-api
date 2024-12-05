const express = require("express");
const likeController = require("../controllers/likeController");
const router = express.Router();


router.post("/addLike", likeController.addLike);
router.post("/removeLike", likeController.removeLike);
router.get("/getLikesWithUser/:id", likeController.getLikesWithUser);

module.exports = router;