import express, { Router } from 'express';

import * as UserController from "../controllers/userController";

const router: Router = express.Router();

// 로그인
router.post('/login', UserController.login);
// 회원가입
router.post('/register', UserController.register);

export { router as userRouter };