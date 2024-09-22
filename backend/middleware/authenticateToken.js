
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Extract the token from the header

    if (!token) return res.sendStatus(403);  // If no token is present, return a 403 error

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);  // If the token is invalid or expired, return 403 error
        req.user = user;  // Attach the decoded token (user data) to the request
        next();
    });
};

module.exports = authenticateToken;
