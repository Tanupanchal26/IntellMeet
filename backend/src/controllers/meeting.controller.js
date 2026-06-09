const Meeting = require('../models/Meeting.model');
const { v4: uuidv4 } = require('uuid');

exports.createMeeting = async (req, res) => {
  const meeting = await Meeting.create({ ...req.body, host: req.user.id, roomId: uuidv4() });
  res.status(201).json(meeting);
};

exports.getMeetings = async (req, res) => {
  const meetings = await Meeting.find({ $or: [{ host: req.user.id }, { participants: req.user.id }] }).populate('host', 'name email');
  res.json(meetings);
};

exports.getMeeting = async (req, res) => {
  const meeting = await Meeting.findById(req.params.id).populate('host participants', 'name email');
  if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
  res.json(meeting);
};

exports.updateMeeting = async (req, res) => {
  const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(meeting);
};

exports.deleteMeeting = async (req, res) => {
  await Meeting.findByIdAndDelete(req.params.id);
  res.json({ message: 'Meeting deleted' });
};

exports.endMeeting = async (req, res) => {
  const meeting = await Meeting.findByIdAndUpdate(req.params.id, { isActive: false, endedAt: new Date() }, { new: true });
  res.json(meeting);
};
