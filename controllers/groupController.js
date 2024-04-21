const Group = require('../model/group');

// Controller method for creating a new group
exports.createGroup = async (req, res) => {
    try {
        const { name, description } = req.body;
        const group = new Group({ name, description });
        await group.save();
        res.status(201).json({ message: 'Group created successfully', group });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller method for deleting a group
exports.deleteGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        await Group.findByIdAndDelete(groupId);
        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        console.error('Error deleting group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller method for searching for groups
exports.searchGroups = async (req, res) => {
    try {
        const { query } = req.query;
        const regex = new RegExp(query, 'i');
        const groups = await Group.find({ $or: [{ name: regex }, { description: regex }] });
        res.status(200).json({ groups });
    } catch (error) {
        console.error('Error searching groups:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller method for adding members to a group
exports.addMembersToGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const { members } = req.body;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        group.members.push(...members);
        await group.save();
        res.status(200).json({ message: 'Members added to the group successfully', group });
    } catch (error) {
        console.error('Error adding members to group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
