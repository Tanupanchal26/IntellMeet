const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  roomId: { type: String, required: true, unique: true },
  startedAt: { type: Date },
  endedAt: { type: Date },
  isActive: { type: Boolean, default: false },
  recordingUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Meeting', meetingSchema);
