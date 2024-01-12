const express = require("express");
const router = express.Router();
const User = require("../models/userModels");
const bcrypt = require("bcrypt");

// Controller function for user registration
const registerUser = async (req, res) => {
    try {
        // Logic for user registration
        // For example, assuming you expect 'name', 'email', and 'password' in the request body
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Please fill in all required fields" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        // Check if the user with the given email already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Respond with user information
        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                // Include any other fields you want to expose
            },
        });
    } catch (error) {
        // Handle errors, log them, and respond with an appropriate error message
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Handle POST request to /register route
router.post("/register", registerUser);

module.exports = router;
