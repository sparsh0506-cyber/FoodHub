import express from 'express';
import { longinUser, registerUser } from '../controllers/userController.js';    
const userRouter = express.Router();

userRouter.post('/login', longinUser);
userRouter.post('/register', registerUser);

export default userRouter;