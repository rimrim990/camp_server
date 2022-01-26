import  { Request, Response, NextFunction } from "express";

import * as FollowService from "../services/followService";
import Follow from "../entities/follow";
import UserInfo from "../types/UserInfo";
import { RequestCustom } from "../types/Request";

export const createFollow = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { followerId } = req.body;
        const userId = req.userId;
        if (!userId || userId === parseInt(followerId)) throw new Error('UNAUTHORIZED');
        const follow: Follow = await FollowService.insertFollow(userId, parseInt(followerId));
        res.json(follow);
    } catch(err) {
        next(err);
    }
}

export const getFollowingListByUserId = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        if (!userId) throw new Error('UNAUTHORIZED');
        const followingList: UserInfo[] = await FollowService.findFollowingsByUserId(userId);
        res.json(followingList);
    } catch (err) {
        next(err);
    }
}

export const getFollowerListByUserId = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        if (!userId) throw new Error('UNAUTHORIZED');
        const followerList: UserInfo[] = await FollowService.findFollowersByUserId(userId);
        res.json(followerList);
    } catch (err) {
        next(err);
    }
}

export const deleteFollower = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { followerId } = req.body;
        const userId = req.userId;
        if (!userId) throw new Error('UNAUTHORIZED');
        
        const follow: Follow | undefined = await FollowService.findFollowByUserAndFollowerId(
            userId, parseInt(followerId));
        if (!follow) throw new Error('UNAUTHORIZED');
        await FollowService.deleteFollow(follow);
        res.json(true);
    } catch (err) {
        next(err);
    }
}
