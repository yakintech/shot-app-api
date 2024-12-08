const express = require('express');
const facibilityController = require('../controllers/facibilityController');

const router = express.Router();

router.post("/", facibilityController.getFollowedFacilities);

module.exports = router;
