// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin', // Admin role
    },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
