const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateTokenAndSetCookie } = require('../utils/generateToken')

const login = async (req, res) => {
  const { /* name, */ username, password } = req.body;

  if (/* !name || */ !username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username }, { password: 0 });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compare(password, user?.password || '');
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateTokenAndSetCookie(user._id, user.isAdmin, res);

    res.status(200).json({ token, user: user, message: "Login Successfull" })

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const signup = async (req, res) => {
  const { username, password, name, email, contactNumber } = req.body;

  try {
    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Check if contact number already exists
    const existingContactNumber = await User.findOne({ contactNumber });
    if (existingContactNumber) {
      return res.status(400).json({ message: 'Contact number already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      email,
      contactNumber
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




module.exports = { login, signup };
