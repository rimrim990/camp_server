import express, { Router } from "express";

import * as PlannerController from "../controllers/plannerController";
import { authJWT } from "../lib/auth";

const router: Router = express.Router();

router.post('/', authJWT, PlannerController.createPlanner);
router.get('/', authJWT, PlannerController.getPlanner);
router.get('/:dayId', authJWT, PlannerController.getDayPlanner);
router.delete('/:dayId', authJWT, PlannerController.deletePlanner);

export { router as plannerRouter };