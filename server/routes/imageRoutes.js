const express = require('express');
const router = express.Router();
// const multer = require('multer');
const imageController = require('../controllers/imageController');
// const { verifyToken } = require('../middlewares/authMiddleware');

// const upload = multer({ dest: 'uploads/' });

router.post('/upload', imageController.uploadImage);
router.get('/get/:userId', imageController.getImages);

module.exports = router;
