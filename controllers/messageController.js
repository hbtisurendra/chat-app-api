const Message = require('../model/message');

// Controller method for sending a message in a group
exports.sendMessage = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { text, sender } = req.body;
        const message = new Message({ text, sender, group: groupId });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully', message });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller method for liking a message
exports.likeMessage = async (req, res) => {
    try {
        const { groupId, messageId } = req.params;
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        message.likes++;
        await message.save();
        res.status(200).json({ message: 'Message liked successfully', message });
    } catch (error) {
        console.error('Error liking message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
