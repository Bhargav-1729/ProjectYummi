const express = require('express');
const router = express.Router();
const restaurantControllers = require('../controllers/resController');
const multer = require('multer');
const authenticateToken = require('../middleware/authenticateToken');

// Define the storage strategy
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Initialize upload
const upload = multer({ storage: storage });

router.post('/registerForm',upload.fields([
    { name: 'logo' },
    { name: 'menuImages' },
    { name: 'foodLicense' },
    { name: 'healthCertification' },
    { name: 'menuItems[0][image]', maxCount: 1 },
    { name: 'menuItems[1][image]', maxCount: 1 }
  ]), restaurantControllers.createRestaurant);

  const restaurantOnly = (req, res, next) => {
    if (req.user.role !== 'Restaurant') {
        return res.status(403).json({ message: 'Access forbidden: Restaurant only.' });
    }
    next();
};

router.get('/restaurantDash', authenticateToken, restaurantOnly, restaurantControllers.renderDashboard);

module.exports = router;