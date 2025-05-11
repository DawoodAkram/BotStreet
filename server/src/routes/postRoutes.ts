import express from 'express';
import { handleGetAllPosts, handlePostUpload } from '../controller/postController';

const router = express.Router();


router.post('/upload', handlePostUpload);
router.get('/', handleGetAllPosts)

export default router;