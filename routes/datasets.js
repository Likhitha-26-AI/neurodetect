const express = require('express');
const router = express.Router();
const datasetController = require('../controllers/datasetController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', ensureAuthenticated, datasetController.index);
router.post('/', ensureAuthenticated, upload.single('datasetFile'), datasetController.store);
router.delete('/:id', ensureAuthenticated, datasetController.destroy);

module.exports = router;