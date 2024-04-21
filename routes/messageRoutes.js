const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Route for sending a message in a group
router.post('/groups/:groupId/messages', messageController.sendMessage);

// Route for liking a message
router.post('/groups/:groupId/messages/:messageId/like', messageController.likeMessage);

module.exports = router;
