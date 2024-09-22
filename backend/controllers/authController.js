const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const Restaurant = require('../models/restaurantModel');

// exports.signup = async (req, res) => {
//     console.log('Signup route hit, request body:', req.body); // Log request data
//     const { email, password } = req.body;
//     try {
//         const newUser = new User({ email, password });
//         await newUser.save();
//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.error('Error in signup:', error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const role = 'user'; // Assign user role
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role // Assign the role
        });
        await newUser.save();
        res.json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
  };

// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email }) ||
//                      await Admin.findOne({ email }) ||    
//                      await Restaurant.findOne({ email });
//         if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//         const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
//         res.json({ token });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find the user by email
//         let user = await User.findOne({ email }) ||
//                    await Admin.findOne({ email }) ||
//                    await Restaurant.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email or password.' });
//         }

//         // Compare the provided password with the hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(400).json({ message: 'Invalid email or password.' });
//         }

//         // Generate JWT
//         const token = jwt.sign({ id: user._id, role: user.constructor.modelName }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Send JWT in response
//         res.status(200).json({
//             token,
//             user: {
//                 id: user._id,
//                 role: user.constructor.modelName,
//             }
//         });
//         console.log(role);
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// };


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }) ||
                     await Admin.findOne({ email }) ||    
                     await Restaurant.findOne({ email });

        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate the token with user ID and role
        const token = jwt.sign(
            { userId: user._id, role: user.constructor.modelName }, 'your_jwt_secret'// Add the role to the token
            , // Use your JWT secret from the environment variable
            { expiresIn: '1h' } // Set token expiration time
        );

        // Send the token back to the client
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};