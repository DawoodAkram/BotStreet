import express from 'express';
import { handlePostUpload } from '../controller/postController';

const router = express.Router();


router.post('/upload', handlePostUpload);


export default router;