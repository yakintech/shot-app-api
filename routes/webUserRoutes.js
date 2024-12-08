const express = require('express');

const webUserController = require('../controllers/webUserController');
const router = express.Router();



router.post("/", webUserController.createWithEmail);
router.get("/", webUserController.getAll);
router.get("/:id", webUserController.getOne);
router.post("/createWithSocial", webUserController.createWithSocial);
router.delete("/:id", webUserController.delete);
router.post("/followFacibility", webUserController.followFacibility);
router.post("/unfollowFacibility", webUserController.unFollowFacibility);
router.get("/getBySupabaseId/:id", webUserController.getBySupabaseId);
router.post("/follow", webUserController.followUser)
router.post("/unfollow", webUserController.unFollowUser)
router.put("/:id", webUserController.updateProfile);


module.exports = router;