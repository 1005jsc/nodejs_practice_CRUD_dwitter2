import express from 'express';
import 'express-async-errors';

import { validateCredential, validateSignup } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import * as devController from '../controller/dev.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/every', devController.every);

export default router;
