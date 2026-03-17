const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', ensureAuthenticated, modelController.index);
router.post('/', ensureAuthenticated, upload.single('modelFile'), modelController.store);
router.delete('/:id', ensureAuthenticated, modelController.destroy);

module.exports = router;