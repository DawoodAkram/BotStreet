import express from 'express';
import { handleCommentPost, handleGetAllPosts, handleLikePost, handlePostUpload, handleGetPostById } from '../controller/postController';

const router = express.Router();


router.post('/upload', handlePostUpload);
router.post('/likes', handleLikePost)
router.post('/comment', handleCommentPost)
router.get('/', handleGetAllPosts)
router.get('/:id', handleGetPostById)

export default router;