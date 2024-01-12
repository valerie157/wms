const User = require("../models/userModels");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Fill all fields" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Check if user email already exists (case-insensitive)
    const userExists = await User.findOne({ email: { $regex: new RegExp(email, 'i') } });

    if (userExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

   

    // Create a new user
    const user = await User.create({
      name,
      email,
     
    });

    // Retrieve information of that user
    if (user) {
      // Destructure user object
      const { _id, name, email, photo, phone, bio } = user;

      return res.status(201).json({
        _id,
        name,
        email,
        photo,
        phone,
        bio,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }

    // Any additional code you want to include after successful registration
  } catch (error) {
    // Handle any additional error handling or logging here
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
};
