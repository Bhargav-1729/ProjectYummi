const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

exports.registerAdmin = async (req, res) => {
    try {
        const { adminName, email, password } = req.body;
        const role = 'admin'; // Assign admin role
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newAdmin = new Admin({
            adminName,
            email,
            password: hashedPassword,
            role // Assign the role
        });
        await newAdmin.save();
        res.json({ message: 'Admin registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering admin' });
    }
  };