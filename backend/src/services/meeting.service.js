const Meeting = require('../models/Meeting.model');
const { v4: uuidv4 } = require('uuid');

exports.createRoom = async (hostId, title) => {
  return Meeting.create({ title, host: hostId, roomId: uuidv4(), isActive: true, startedAt: new Date() });
};

exports.getRoomById = async (roomId) => Meeting.findOne({ roomId }).populate('host participants', 'name email avatar');
