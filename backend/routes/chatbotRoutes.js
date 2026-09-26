const express = require('express');
const router = express.Router();
const { handleChatMessage } = require('../controllers/chatbotController');

router.post('/query', handleChatMessage);

module.exports = router;