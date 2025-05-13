import express from 'express';
import {handleRegisterUser,loginUser,fetchUser} from '../controller/signupController';
const router = express.Router();


router.post('/register', handleRegisterUser);
router.post('/login',loginUser);
router.get('/profile/:uid', fetchUser);
export default router;