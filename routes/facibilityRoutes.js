const express = require('express');
const facibilityController = require('../controllers/facibilityController');
const router = express.Router();


router.get("/", facibilityController.getAll);
router.get("/:id", facibilityController.getOne);
router.post("/", facibilityController.create);
router.put("/:id", facibilityController.update);
router.delete("/:id", facibilityController.delete);


module.exports = router;