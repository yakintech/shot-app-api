const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const multer = require('multer');

const facibilityController = require('../controllers/facibilityController');
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


router.get("/", facibilityController.getAll);
router.get("/:id", facibilityController.getOne);
router.post("/", upload.single('file'),facibilityController.create);
router.put("/:id", facibilityController.update);
router.delete("/:id", facibilityController.delete);


module.exports = router;
