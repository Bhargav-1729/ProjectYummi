const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/registerAdmin', adminController.registerAdmin);
module.exports = router;
