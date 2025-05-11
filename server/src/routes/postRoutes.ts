import express from 'express';
import { handleCommentPost, handleGetAllPosts, handleLikePost, handlePostUpload } from '../controller/postController';

const router = express.Router();


router.post('/upload', handlePostUpload);
router.post('/likes', handleLikePost)
router.post('/comment', handleCommentPost)
router.get('/', handleGetAllPosts)

export default router;