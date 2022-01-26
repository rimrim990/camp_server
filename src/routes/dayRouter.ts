import express, { Router } from "express";

import * as DayController from "../controllers/dayController";
import { authJWT } from "../lib/auth";

const router: Router = express.Router();

// 오늘 날짜로 계획표 추가
router.post('/', authJWT, DayController.createDay);
// 생성된 모든 계획표 조회
router.get('/', authJWT, DayController.getDayList);
// 날짜로 계획표 조회
router.get('/:date', authJWT, DayController.getDayByDate);
// 명언 수정
router.post('/comment/:dayId(\\d+)', authJWT, DayController.updateComment);
// 목표 공부 시간 수정
router.post('/target/:dayId(\\d+)', authJWT, DayController.updateTargetTime);
router.get('/total/:dayId(\\d+)', authJWT, DayController.getTotalTime);
// 총 공부 시간 수정
router.post('/total/:dayId(\\d+)', authJWT, DayController.updateTotalTime);
// 계획표 삭제
router.delete('/:dayId(\\d+)', authJWT, DayController.deleteDay);

export { router as dayRouter };