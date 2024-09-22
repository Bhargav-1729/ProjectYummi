const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();

connectDB();



app.use(cors({
   origin: 'http://localhost:3000', // Replace with your frontend URL
   methods: ['GET', 'POST']
}));


app.use(express.json());

app.get('/api/test', (req, res) => {
    res.send('API is working');
});


app.use('/api/auth', authRoutes);
app.use('/api/auth', adminRoutes);
app.use('/api/auth', restaurantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
