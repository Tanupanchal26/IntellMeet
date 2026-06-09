const { getAIResult, generateSummary, getTranscript, getActionItems } = require('../controllers/ai.controller');
const { protect } = require('../middleware/auth.middleware');
const router = require('express').Router();

router.use(protect);
router.get('/:meetingId', getAIResult);
router.post('/:meetingId/summary', generateSummary);
router.get('/:meetingId/transcript', getTranscript);
router.get('/:meetingId/action-items', getActionItems);

module.exports = router;
