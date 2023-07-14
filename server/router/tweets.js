import express from 'express';
import 'express-async-errors';

import * as TweetController from '../controller/tweets.js';

const router = express.Router();

// GET /tweets , /tweets?username=:username

router.get('/', TweetController.getTweets);

// GET /tweets/:id

router.get('/:id', TweetController.getTweet);

// POST /tweets

router.post('/', TweetController.createTweet);

// PUT /tweets/:id

router.put('/:id', TweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', TweetController.removeTweet);

export default router;
