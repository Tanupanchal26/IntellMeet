const { getProfile, updateProfile, deleteAccount, getAllUsers } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const router = require('express').Router();

router.use(protect);
router.get('/me', getProfile);
router.put('/me', updateProfile);
router.delete('/me', deleteAccount);
router.get('/', getAllUsers);

module.exports = router;
