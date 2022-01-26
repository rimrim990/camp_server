import { Request, Response, NextFunction } from "express";
import fs from "fs"
import path from 'path';
import mime from "mime";

import Book from "../entities/book";
import User from "../entities/users";

import * as BookService from "../services/bookService";
import * as UserService from "../services/userService";
import { RequestCustom } from "../types/Request";

export const createBook = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { subject, publisher, course } = req.body;
        if (subject === "" || publisher === "" || course === "") throw new Error('Invalid Input');
        const book: Book = await BookService.insertBook(subject, publisher, course);
        res.json(book);
    } catch(err) {
        next(err);
    }
}

export const getBookUser = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const book: Book | undefined = await BookService.findBookById(parseInt(bookId));
        if (!book) throw new Error('UNAUTHORIZED');

        const bookUsers: User[] = await BookService.findBookUserById(book);
        res.json(bookUsers);
    } catch (err)  {
        next(err);
    }
}

export const getUserBook = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        let user;
        if (userId) user = await UserService.findUserById(userId);
        if (!user) throw new Error('UNAUTHORIZED');

        const userBook: Book[] = await Book.findUserBook(user);
        res.json(userBook);
    } catch (err)  {
        next(err);
    }
}

export const getBookList = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const bookList: Book[] = await BookService.findAllBook();
        res.json(bookList);
    } catch (err)  {
        next(err);
    }
}

export const getBookImage = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const book: Book | undefined = await BookService.findBookById(parseInt(bookId));
        if (!book) throw new Error('UNAUTHORIZED');
        
        
        let imageName: string = book.course + "_ " + book.subject + "_ " + book.publisher + ".jpeg";
        let imagePath: string = path.join(__dirname, '../public/img/' + imageName);
        let imageMime: string = mime.lookup(imagePath);

        fs.readFile(imagePath, function(err, data){
            if (err) {
                next(err);
            } else {
                res.writeHead(200, { 'Content-Type': imageMime });
                res.end(data);
            }
        })
        
    } catch (err) {
        next(err);
    }
}

export const addBookUser = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const userId = req.userId;
        let user: User | undefined;
        if (userId) user = await UserService.findUserById(userId);
        if (!user) throw new Error('UNAUTHORIZED');
        
        const book: Book | undefined = await BookService.findBookById(parseInt(bookId));
        if (!book) throw new Error('UNAUTHORIZED');

        let isIncluded = false;
        console.log(book.user);
        for (let i=0; i<book.users.length; i++) {
            if (book.users[i].id === user.id) {
                isIncluded = true;
                break;
            }
        }
        if (!isIncluded) {
            const updatedBook: Book = await BookService.updateBookUser(user, book);
            res.json(updatedBook);
        } else {
            res.json(book);
        }
        
    } catch (err) {
        next(err);
    }
}

export const deleteBookUser = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const userId = req.userId;
        let user: User | undefined;
        if (userId) user = await UserService.findUserById(userId);
        if (!user) throw new Error('UNAUTHORIZED');
        
        const book: Book | undefined = await BookService.findBookById(parseInt(bookId));
        if (!book) throw new Error('UNAUTHORIZED');

        let userIndex: number = -1;
        for (let i=0; i<book.users.length; i++) {
            if (book.users[i].id === user.id) {
                userIndex = i;
                break;
            }
        }
        if (userIndex === -1) res.json(book);

        const updatedBook: Book = await BookService.deleteBookUser(userIndex, book);
        res.json(updatedBook);
    } catch (err) {
        next(err);
    }
}

export const deleteBook = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { bookId }  = req.params;
        const book: Book | undefined = await BookService.findBookById(parseInt(bookId));
        if (!book) throw new Error('UNAUTHORIZED');
        await BookService.deleteBook(book);
        res.json(true);
    } catch (err) {
        next(err);
    }
}

