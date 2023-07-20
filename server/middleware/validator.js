import { body, validationResult, check } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
};

export const validateCredential = [
  body('username').trim().notEmpty().withMessage('username should be at least 5 characters'),
  body('password').trim().notEmpty().withMessage('password should be at least 5 characters'),
  validate,
];

export const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url').isURL().withMessage('invalid Url').optional({ values: 'falsy' }),
  validate,
];
