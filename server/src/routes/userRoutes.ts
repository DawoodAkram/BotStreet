import express from 'express';
import { handleGetSuggestedUsers } from '../controller/usersController';

const router = express.Router();

router.get('/suggestion', handleGetSuggestedUsers); // expects ?user_id=...

export default router;
