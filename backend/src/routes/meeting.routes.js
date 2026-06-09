const { createMeeting, getMeetings, getMeeting, updateMeeting, deleteMeeting, endMeeting } = require('../controllers/meeting.controller');
const { protect } = require('../middleware/auth.middleware');
const router = require('express').Router();

router.use(protect);
router.post('/', createMeeting);
router.get('/', getMeetings);
router.get('/:id', getMeeting);
router.put('/:id', updateMeeting);
router.delete('/:id', deleteMeeting);
router.post('/:id/end', endMeeting);

module.exports = router;
