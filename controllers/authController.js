const User = require('../model/userModel'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSession = require('../model/userSession');
const { json } = require('body-parser');

const generateAuthToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7h' });
};

// Controller method for user login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        console.log(user,'uuuu')
        if (user === null && !user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // // Check password
        let isPasswordMatch = false
        if (password === user.password) {
            isPasswordMatch = true  
        }
       // await bcrypt.compare(password, user.password);
        console.log(isPasswordMatch,password,user.password,'uuuu')
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = generateAuthToken(user);
        const userSession = new UserSession({ userId: user._id, token });
        await userSession.save();

        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller method for user logout
exports.logout = async (req, res) => {
    const { userId } = req.body; // Assuming you're sending the userId in the request body
  
  try {
    // Find the user session in the database
    const userSession = await UserSession.findOneAndDelete({ userId });

    if (!userSession) {
      // If user session not found, return a response indicating the user is not logged in
      return res.status(404).json({ message: 'User session not found. User may already be logged out.' });
    }

    // Send a response indicating successful logout
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out user:', error);
    // If an error occurs, send a 500 Internal Server Error response
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
