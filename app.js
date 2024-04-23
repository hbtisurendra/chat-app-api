const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/userModel'); 
const jwt = require('jsonwebtoken');


const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const groupsRoutes = require('./routes/groupRoutes');
const messageRoutes = require('./routes/messageRoutes');

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(bodyParser.json());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define secret key for JWT
const secretKey = process.env.JWT_SECRET;
    // Authentication middleware
const authenticateToken = (req, res, next) => {
    const token1 = req.headers['authorization'];
    if (!token1) return res.status(401).send('Access Denied');
    let token2 = token1?.split(' ');
    let token = token2[1]
    

    jwt.verify(token, secretKey, (err, user) => {
        if (err){
            return res.status(403).send('Invalid Token');
        } else{
            req.user = user;
            next();
        }
        
    });
};

// Apply authentication middleware to all routes except login
app.use((req, res, next) => {
    if (req.path === '/login') {
        next(); // Skip authentication for login route
    } else {
        authenticateToken(req, res, next); // Apply authentication for other routes
    }
});


    // Authentication routes
app.use('/', authRoutes);

app.use('/admin', adminRoutes); // Admin routes

app.use('/group', groupsRoutes);  // group routes

app.use('/message', messageRoutes);  // group routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


    app.get('/', (req, res) => {
        res.send('Hello, Express with MongoDB!');
    });

    

    // const users = [
    //     { name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' },
    //     { name: 'Regular User', email: 'user@example.com', password: 'user456' }
    //     // Add more users as needed
    // ];
    
    // User.insertMany(users)
    //     .then(() => console.log('Users inserted successfully'))
    //     .catch((err) => console.error('Error inserting users:', err));
    
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    
