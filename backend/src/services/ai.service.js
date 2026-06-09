const AIResult = require('../models/AIResult.model');
const { summarize: summarizeAI } = require('../ai/summarizer');
const { extractActionItems } = require('../ai/actionItems');

exports.summarize = async (meetingId) => {
  const result = await AIResult.findOne({ meeting: meetingId });
  if (!result?.transcript) return '';
  const summary = await summarizeAI(result.transcript);
  const actionItems = await extractActionItems(result.transcript);
  await AIResult.findByIdAndUpdate(result._id, { summary, actionItems });
  return summary;
};
