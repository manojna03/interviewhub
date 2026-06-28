const User = require("../models/User");

const createUser = async (req, res) => {
    try {
        // Extract user data from the request body
        const {
            name,
            email,
            password,
            college,
            branch,
            graduationYear
        } = req.body;

        // Create and save the user in MongoDB
        const user = await User.create({
            name,
            email,
            password,
            college,
            branch,
            graduationYear
        });

        // Send success response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createUser
};