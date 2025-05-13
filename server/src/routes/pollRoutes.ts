import express from 'express';
import { createPoll, getAllPolls, votePoll } from '../controller/pollController';
const router = express.Router();

router.post('/create', createPoll);
router.get('/', getAllPolls);
router.post('/vote', votePoll);

export default router;
