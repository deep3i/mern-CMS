const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken.js');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists. Please try logging in.', success: false });
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();

    res.status(201).json({ message: 'User successfully registered. You can now log in.', success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user. Please try again later.', success: false });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid email or password. Please try again.', success: false });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password. Please try again.', success: false });
  try {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .json({ message: 'Login successful', success: true, accessToken, user });
  } catch (error) {
    res.status(500).json({ message: 'Error during login. Please try again later.', success: false });
  }
};

exports.refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token found. Please log in again.', success: false });
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: 'Invalid refresh token. Please log in again.', success: false });
    }
    const accessToken = generateAccessToken(user);
    res.json({ message: 'Access token refreshed successfully.', success: true, accessToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token. Please log in again.', success: false });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Successfully logged out. See you soon!', success: true });
};
