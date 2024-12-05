const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');

const webUserController = require('../controllers/webUserController');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

router.get("/", webUserController.getAll);
router.get("/:id", webUserController.getOne);
router.post("/", upload.single('file'), webUserController.create);
router.delete("/:id", webUserController.delete);
router.post("/followFacibility", webUserController.followFacibility);
router.post("/unfollowFacibility", webUserController.unFollowFacibility);


module.exports = router;