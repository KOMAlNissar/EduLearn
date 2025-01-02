import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { AppError } from '../utils/errorHandler.js';

export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

export const createUser = async (userData) => {
  const userExists = await User.findOne({ email: userData.email });
  if (userExists) {
    throw new AppError('User already exists', 400);
  }
  
  const user = await User.create(userData);
  const token = generateToken(user._id);
  
  return { user, token };
};

export const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid credentials', 401);
  }
  
  const token = generateToken(user._id);
  return { user, token };
};