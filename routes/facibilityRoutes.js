const express = require('express');
const multer = require('multer');

const facibilityController = require('../controllers/facibilityController');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", facibilityController.getAll);
router.get("/:id", facibilityController.getOne);
router.post("/", upload.array("files", 10), facibilityController.create);
router.put("/:id", facibilityController.update);
router.delete("/:id", facibilityController.delete);
router.post("/:id/follow", facibilityController.toggleFollowFacibility);

module.exports = router;
