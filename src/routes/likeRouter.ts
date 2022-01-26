import express, { Router } from "express";

import * as LikeController from "../controllers/likeController";
import { authJWT } from "../lib/auth";

const router: Router = express.Router();

// 좋아요 누르기
router.post('/', authJWT, LikeController.createLike);
// 나의 특정 업무에 좋아요를 준 회원들 조회
router.get('/:taskId(\\d+)', authJWT, LikeController.getLikeListByUserAndTaskId);
// userid, targetid, taskid로 좋아요 취소
router.delete('/', authJWT, LikeController.deleteLike);
// like id로 좋아요 취소
router.delete('/:likeId(\\d+)', authJWT, LikeController.deleteLikeById);

export { router as likeRouter };
