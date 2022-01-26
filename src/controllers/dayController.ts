import { Request, Response, NextFunction } from "express";
import Day from "../entities/days";
import User from "../entities/users";

import * as DayService from "../services/dayService";
import { RequestCustom } from "../types/Request";
import { isValidDate, toDate } from "../lib/date";

export const createDay = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { targetTime, comment, date } = req.body;
        const userId: number | undefined = req.userId;
        if (!userId) throw new Error('UNAUTHORIZED');

        /*
        let day: Day;

        if (date) {
            // 지정된 날짜로 생성
            if (!isValidDate(date)) throw new Error('UNAUTHORIZED');
            const updatedDate: Date = toDate(date);
            day = await DayService.insertDay(userId, parseInt(targetTime), comment, updatedDate);
        } else {
            // 오늘 날짜로 생성
            day = await DayService.insertDay(userId, parseInt(targetTime), comment);
        }*/
        const day = await DayService.insertDay(userId, targetTime, comment, date);
        res.json(day);
    } catch (err) {
        next(err);
    }
}

export const getDayList = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const userId: number | undefined = req.userId;
        if (!userId) throw new Error('UNAUTHORIZED');
        const dayList: Day[] = await DayService.findDayListByUserId(userId);
        res.json(dayList);
    } catch (err) {
        next(err);
    }
}

export const getTotalTime = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { dayId } = req.params;
        const day: Day | undefined = await DayService.findDayById(parseInt(dayId));
        if (!day) throw new Error('UNAUTHORIZED');
        res.json(day.totalTime); 
    } catch(err) {
        next(err);
    }
}

export const getDayByDate = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const userId: number | undefined = req.userId;
        if (!userId) throw new Error('UNAUTHORIZED');
        const { date } = req.params;
        /*
        let updatedDate: Date;

        if (isValidDate(date)) throw new Error('UNAUTHORIZED');
        else updatedDate = toDate(date);
        */
        const day: Day | undefined = await DayService.findDayByDateAndUserId(userId, date);
        if (!day) throw new Error('UNAUTHORIZED');
        res.json(day);
    } catch (err) {
        next(err);
    }
}

export const updateTotalTime = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { dayId } = req.params;
        const { totalTime } = req.body;
        const day: Day | undefined = await DayService.findDayById(parseInt(dayId));
        if (!day) throw new Error('UNAUTHORIZED');

        const updatedDay: Day = await DayService.updateTotalTime(day, parseInt(totalTime));
        if (!updatedDay) throw new Error('INTERNAL SERVER ERROR');
        res.json(updatedDay);
    } catch (err) {
        next(err);
    }
}

export const updateComment = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { dayId } = req.params;
        const { comment } = req.body;
        const day: Day | undefined = await DayService.findDayById(parseInt(dayId));
        if (!day) throw new Error('UNAUTHORIZED');

        const updatedDay: Day = await DayService.updateComment(day, comment);
        res.json(updatedDay);
    } catch (err) {
        next(err);
    }
}

export const updateTargetTime = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { dayId } = req.params;
        const { targetTime } = req.body;
        const day: Day | undefined = await DayService.findDayById(parseInt(dayId));
        if (!day) throw new Error('UNAUTHORIZED');

        const updatedDay: Day = await DayService.updateTargetTime(day, targetTime);
        res.json(updatedDay);
    } catch (err) {
        next(err);
    }
}

export const deleteDay = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { dayId } = req.params;
        const day: Day | undefined = await DayService.findDayById(parseInt(dayId));
        if (!day) throw new Error('UNAUTHORIZED');
        
        const result: boolean = await DayService.deleteDay(day);
        res.json(result);
    } catch (err) {
        next(err);
    }
}