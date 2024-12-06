const express = require('express');

const webUserController = require('../controllers/webUserController');
const router = express.Router();



router.get("/", webUserController.getAll);
router.get("/:id", webUserController.getOne);
router.post("/createWithSocial", webUserController.createWithSocial);
router.delete("/:id", webUserController.delete);
router.post("/followFacibility", webUserController.followFacibility);
router.post("/unfollowFacibility", webUserController.unFollowFacibility);


module.exports = router;