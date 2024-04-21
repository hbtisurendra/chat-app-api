const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/userModel'); 

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
    
