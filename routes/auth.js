import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { validateRegistration, validateLogin } from '../middleware/validation.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.post('/register', validateRegistration, asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ email, password, name });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.status(201).json({
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  });
}));

router.post('/login', validateLogin, asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  });
}));

export default router;