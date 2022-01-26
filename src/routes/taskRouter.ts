import express, { Router } from "express";

import * as TaskController from "../controllers/taskController";
import { authJWT } from "../lib/auth";

const router: Router = express.Router();

// 업무 추가
router.post('/', authJWT, TaskController.createTask);
// 특정 날짜 (dayId) 에 등록된 업무 조회
router.get('/:dayId(\\d+)', authJWT, TaskController.getTaskListByDayId);
// 업무 완수 여부 수정
router.post('/finish/:dayId(\\d+)', authJWT, TaskController.updateTaskIsFinished);
// 업무 과목 수정
router.post('/subject/:taskId(\\d+)', authJWT, TaskController.updateTaskSubject);
// 업무 내용 수정
router.post('/title/:dayId(\\d+)', authJWT, TaskController.addTitle);
// 업무 삭제
router.delete('/:taskId(\\d+)', authJWT, TaskController.deleteTask);

export { router as taskRouter };