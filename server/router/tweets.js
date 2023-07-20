import express from 'express';
import 'express-async-errors';

import * as TweetController from '../controller/tweets.js';
import { body, validationResult, check } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';
// import { isAuth } from '../middleware/auth.js'
const router = express.Router();

// express-validator 로 규칙도 정해보자
// 유효성 검사는 라우터 쪽에서 해주고 싶다

const validateTweet = [
  body('text').trim().isLength({ min: 3 }).withMessage('text should be at least 3 characters'),
  validate,
];

// GET /tweets , /tweets?username=:username

router.get('/', isAuth, TweetController.getTweets);

// GET /tweets/:id

router.get('/:id', isAuth, TweetController.getTweet);

// POST /tweets

router.post('/', validateTweet, isAuth, TweetController.createTweet);

// PUT /tweets/:id

router.put('/:id', validateTweet, isAuth, TweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', isAuth, TweetController.removeTweet);

export default router;
