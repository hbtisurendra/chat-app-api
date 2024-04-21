const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    sender: { type: String, required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    likes: { type: Number, default: 0 }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
