const User = require('../models/User.model');
const { generateToken } = require('../services/jwt.service');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use' });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = generateToken(user._id);
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });
  const token = generateToken(user._id);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
};

exports.logout = (req, res) => res.json({ message: 'Logged out' });

exports.refreshToken = (req, res) => res.json({ message: 'Refresh token endpoint' });

exports.forgotPassword = (req, res) => res.json({ message: 'Password reset email sent' });

exports.resetPassword = (req, res) => res.json({ message: 'Password reset successful' });
