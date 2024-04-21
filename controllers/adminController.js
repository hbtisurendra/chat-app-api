const User = require('../model/userModel');

// Controller method for creating a new user
exports.createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const newUser = new User({
            name,
            email,
            password,
            role
        });

        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller method for editing an existing user
exports.editUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password, role } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        user.role = role || user.role;

        await user.save();

        res.json(user);
    } catch (error) {
        console.error('Error editing user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
