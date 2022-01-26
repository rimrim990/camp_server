import express, { Router } from "express";

import * as BookController from "../controllers/bookController";
import { authJWT } from "../lib/auth";

const router: Router = express.Router();

router.get('/', authJWT, BookController.getBookList);
router.get('/image/:bookId', authJWT, BookController.getBookImage);
router.get('/user', authJWT, BookController.getUserBook);
router.post('/', authJWT, BookController.createBook);
router.post('/:bookId', authJWT, BookController.addBookUser);
router.delete('/user/:bookId', authJWT, BookController.deleteBookUser);
router.delete('/:bookId', authJWT, BookController.deleteBook);

export { router as bookRouter };