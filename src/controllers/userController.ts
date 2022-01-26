import { Response, Request, NextFunction } from "express";

import * as UserService from "../services/userService";
import User from "../entities/users";
import { generateHashedPassword, verifyPassword, generateHashSalt } from "../lib/crypto";
import { generateAccessToken } from "../lib/jwt";
import { RequestCustom } from "../types/Request";
import Book from "../entities/book";

// POST
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const user: User | undefined = await UserService.findUserByUsername(username);
        if (!user) throw new Error('UNAUTHORIZED');
        
        const isValid: boolean = await verifyPassword(password, user.password, user.hashSalt);
        if (!isValid) throw new Error('UNAUTHORIZED');

        const accessToken: string = await generateAccessToken(user);
        return res.json({
            accessToken,
            displayName: user.displayName
        });
    } catch (err) {
        next(err);
    }
}

// POST
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, displayName } = req.body;
        const hashSalt: string = await generateHashSalt();
        const hashedPassword: string = await generateHashedPassword(password, hashSalt);

        if (username == null || password == null || displayName == null) throw new Error();
        const user: User = await UserService.insertUser(username, hashedPassword, displayName, hashSalt);

        const accessToken: string = await generateAccessToken(user);
        return res.json({
            accessToken
        });
    } catch (err) {
        next(err);
    }
}

