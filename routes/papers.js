const express = require('express');
const router = express.Router();
const paperController = require('../controllers/paperController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', ensureAuthenticated, paperController.index);
router.get('/create', ensureAuthenticated, paperController.create);
router.post('/', ensureAuthenticated, upload.single('pdfFile'), paperController.store);
router.get('/:id', ensureAuthenticated, paperController.show);
router.get('/:id/edit', ensureAuthenticated, paperController.edit);
router.put('/:id', ensureAuthenticated, upload.single('pdfFile'), paperController.update);
router.delete('/:id', ensureAuthenticated, paperController.destroy);

module.exports = router;