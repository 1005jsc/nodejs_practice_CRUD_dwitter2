import express from 'express';
import 'express-async-errors';

import { validateCredential, validateSignup } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';

const router = express.Router();

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

export default router;
