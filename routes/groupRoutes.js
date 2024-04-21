const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Route for creating a new group
router.post('/groups', groupController.createGroup);

// Route for deleting a group
router.delete('/groups/:groupId', groupController.deleteGroup);

// Route for searching for groups
router.get('/groups', groupController.searchGroups);

// Route for adding members to a group
router.post('/groups/:groupId/members', groupController.addMembersToGroup);

module.exports = router;
