import express, { Router } from "express";

import * as FollowController from "../controllers/followController";
import { authJWT } from "../lib/auth";

const router: Router = express.Router();

// 팔로잉
router.post('/', authJWT, FollowController.createFollow);
// 나를 팔로잉하는 사용자 조회
router.get('/follower', authJWT, FollowController.getFollowerListByUserId);
// 내가 팔로잉하고있는 사용자 조회
router.get('/following', authJWT, FollowController.getFollowingListByUserId);
// 팔로잉 취소
router.delete('/', authJWT, FollowController.deleteFollower);

export { router as followRouter };
