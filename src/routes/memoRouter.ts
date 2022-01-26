import express, { Router } from "express";

import * as MemoController from "../controllers/memoController";
import { authJWT } from "../lib/auth";

const router: Router = express.Router();

router.post('/', authJWT, MemoController.createMemo);
router.get('/', authJWT, MemoController.getMemoByUserId);
router.post('/:memoId', authJWT, MemoController.updateMemo);
router.delete('/:memoId', authJWT, MemoController.deleteMemo);

export { router as memoRouter };