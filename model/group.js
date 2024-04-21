const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    members: [{ type: String }] // Assuming members are stored as an array of strings (e.g., user IDs)
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
