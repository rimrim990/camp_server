import express, { Router } from "express";

import * as TimeController from "../controllers/timeController";
import { authJWT } from "../lib/auth";

const router: Router = express.Router();

router.post('/', authJWT, TimeController.createTime);
router.get('/:dayId(\\d+)', authJWT, TimeController.getTimeList);
router.post('/:dayId(\\d+)', authJWT, TimeController.updateTimeColor);

export { router as timeRouter };
