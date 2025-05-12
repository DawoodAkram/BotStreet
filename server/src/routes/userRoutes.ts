import express from 'express';
import { handleFollowUser, handleGetSuggestedUsers } from '../controller/usersController';
const router = express.Router();

router.get('/suggestion', handleGetSuggestedUsers); // expects ?user_id=...
router.post('/follow', handleFollowUser);

export default router;
