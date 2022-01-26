import { Request, Response, NextFunction } from "express";

import User from "../entities/users";
import Like from "../entities/like";
import * as LikeService from "../services/likeService";
import * as UserService from "../services/userService";
import * as TaskService from "../services/taskService"
import Task from "../entities/tasks";
import UserInfo from "../types/UserInfo";
import { RequestCustom } from "../types/Request";

export const createLike = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        if (!userId) throw new Error('UNAUTHORIZED');
        const { targetId, taskId } = req.body;
        const like: Like = await LikeService.insertLike(userId, parseInt(targetId), parseInt(taskId));
        res.json(like);
    } catch (err) {
        next(err);
    }
}

export const getLikeListByUserAndTaskId = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params;
        const userId = req.userId;
        if (!userId) throw new Error('UNAUTHORIZED');
        const likeList: UserInfo[] = await LikeService.findLikeByUserAndTaskId(userId, parseInt(taskId));
        res.json(likeList);
    } catch(err) {
        next(err);
    }
}

export const deleteLike = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        if (!userId) throw new Error('UNAUTHORIZED');

        const { targetId, taskId } = req.body;
        const like: Like | undefined = await LikeService.findLike(userId, parseInt(targetId), parseInt(taskId));
        if (!like) throw new Error('UNAUTHORIZED');
    
        await LikeService.deleteLike(like);
        res.json(true);
    } catch(err) {
        next(err);
    }
}

export const deleteLikeById = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { likeId } = req.params;
        const like: Like | undefined = await LikeService.findLikeById(parseInt(likeId));
        if (!like) throw new Error('UNAUTHORIZED');

        await LikeService.deleteLike(like);
        res.json(true);
    } catch(err) {
        next(err);
    }
}

