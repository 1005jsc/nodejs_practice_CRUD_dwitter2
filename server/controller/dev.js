import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';

export const every = async (req, res, next) => {
  const users = await userRepository.getAllUsers();

  res.status(200).json({ users: users });
};
