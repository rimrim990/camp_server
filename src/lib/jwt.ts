import jwt from 'jsonwebtoken';
import Dotenv from 'dotenv';
import { promisify } from 'util';
import UserInfo from '../types/UserInfo';
import User from '../entities/users';

Dotenv.config();

const SECRET: string = process.env.SECRET || '';

// access token 발급
export const generateAccessToken = (user: User): string => {
    const payload: UserInfo = {
        id: user.id, 
        username: user.username,
        displayName: user.displayName,
        createdAt: user.createdAt,
    };
    return jwt.sign(payload, SECRET, {
        algorithm: 'HS256',
        expiresIn: '365d',
    });
}

// access token 검증
export const verifyAccessToken = (token: string) => {
    let decoded = null;
    try {
        decoded = jwt.verify(token, SECRET) as UserInfo;
        return {
            ok: true,
            id: decoded.id,
            username: decoded.username,
            displayName: decoded.displayName,
            createdAt: decoded.createdAt,
        };
    } catch (err: any) {
        return {
            ok: false,
            message: err.message,
        }
    }
}