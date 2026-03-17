const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', ensureAuthenticated, profileController.index);
router.post('/update', ensureAuthenticated, upload.single('profilePicture'), profileController.update);
router.post('/change-password', ensureAuthenticated, profileController.changePassword);

module.exports = router;