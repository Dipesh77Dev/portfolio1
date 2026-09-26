const express = require('express');
const router = express.Router();
const { trackVisitor } = require('../controllers/trackingController');

router.post('/log', trackVisitor);

module.exports = router;