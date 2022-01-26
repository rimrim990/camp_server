import util from 'util';
import crypto from 'crypto';
import Dotenv from 'dotenv';
Dotenv.config();

const ALGO: string = 'sha512';
const KEY_LEN: number = 64;
const ITER: number = 256;

const pbkdf2 = util.promisify(crypto.pbkdf2);
const randomBytes = util.promisify(crypto.randomBytes);

// 단방향 해쉬
const generateHashedPassword = async (password: string, salt: string): Promise<string> => {
    const digest: Buffer = await pbkdf2(password, salt, ITER, KEY_LEN, ALGO);
    return digest.toString('base64');
}

const verifyPassword = async (password:string, hashedPassword: string, salt: string): Promise<boolean> => {
    const storedDigest = Buffer.from(hashedPassword, 'base64');
    const digest: Buffer = await pbkdf2(password, salt, ITER, KEY_LEN, ALGO);
    return Buffer.compare(digest, storedDigest) === 0;
}

const generateHashSalt = async (): Promise<string> => {
    const salt: Buffer = await randomBytes(32);
    return salt.toString('base64');
}

export { generateHashedPassword, verifyPassword, generateHashSalt };