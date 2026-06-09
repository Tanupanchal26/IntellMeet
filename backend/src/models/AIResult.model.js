const mongoose = require('mongoose');

const aiResultSchema = new mongoose.Schema({
  meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: true },
  transcript: { type: String, default: '' },
  summary: { type: String, default: '' },
  actionItems: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('AIResult', aiResultSchema);
