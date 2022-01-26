import { Request, Response, NextFunction } from "express";
import { RepositoryNotTreeError } from "typeorm";
import Memo from "../entities/memo";

import * as MemoService from "../services/memoService";
import { RequestCustom } from "../types/Request";

export const createMemo = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        if (!userId) throw new Error('UNAUTHORIZED');
        const { title, content } = req.body;
        const memo: Memo | undefined = await MemoService.insertMemo(userId, title, content);
        res.json(memo); 
    } catch(err) {
        next(err);
    }  
}

export const getMemoByUserId = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        if (!userId) throw new Error('UNAUTHORIZED');
        const memoList: Memo[] = await MemoService.getMemoByUserId(userId);
        res.json(memoList);
    } catch(err) {
        next(err);
    }
}

export const updateMemo = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { memoId } = req.params;
        const { title, content } = req.body;
        const memo: Memo | undefined = await MemoService.getMemoById(parseInt(memoId));
        if (!memo) throw new Error('UNAUTHORIZED');
        const updatedMemo: Memo = await MemoService.updateMemo(memo, title, content);
        res.json(updatedMemo);
    } catch (err) {
        next(err);
    }
}   

export const deleteMemo = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        if (!userId) throw new Error('UNAUTHORIZED');
        const { memoId } = req.params;
        const memo: Memo | undefined = await MemoService.getMemoById(parseInt(memoId));
        if(!memo) throw new Error('UNAUTHORIZED');
        await MemoService.deleteMemo(memo);
        res.json(true);
    } catch(err) {
        next(err);
    }
}