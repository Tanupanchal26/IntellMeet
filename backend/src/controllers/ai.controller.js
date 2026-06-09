const AIResult = require('../models/AIResult.model');
const aiService = require('../services/ai.service');

exports.getAIResult = async (req, res) => {
  const result = await AIResult.findOne({ meeting: req.params.meetingId });
  if (!result) return res.status(404).json({ message: 'No AI result found' });
  res.json(result);
};

exports.generateSummary = async (req, res) => {
  const summary = await aiService.summarize(req.params.meetingId);
  res.json({ summary });
};

exports.getTranscript = async (req, res) => {
  const result = await AIResult.findOne({ meeting: req.params.meetingId });
  res.json({ transcript: result?.transcript || '' });
};

exports.getActionItems = async (req, res) => {
  const result = await AIResult.findOne({ meeting: req.params.meetingId });
  res.json({ actionItems: result?.actionItems || [] });
};
