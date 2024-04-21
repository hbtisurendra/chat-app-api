// models/UserSession.js
const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '7d' } // Session expires after 7 days
});

const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports = UserSession;
