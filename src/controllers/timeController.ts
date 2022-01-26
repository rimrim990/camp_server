import { Response, Request, NextFunction } from "express";

import { defaultTimeBlock } from "../types/TimeBlock";
import * as TimeService from "../services/timeService";
import Time from "../entities/time";

export const createTime = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { dayId } = req.body;
        const time = await TimeService.insertTime(dayId);
        res.json(time);
    } catch (err) {
        next(err);
    }
}

export const getTimeList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { dayId } = req.params;
        const time: Time | undefined = await TimeService.findTimeByDayId(parseInt(dayId));
        if (!time) throw new Error('UNAUTHORIZED');
        res.json(time);
    } catch (err) {
        next(err);
    }
}

export const updateTimeColor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { dayId } = req.params;
        const { color, hour, minute } = req.body;
        const time: Time | undefined = await TimeService.findTimeByDayId(parseInt(dayId));
        if (!time) throw new Error('UNAUTHORIZED');

        let hourIndex: number = -1;
        let minuteIndex: number = -1;

        for (let i=0; i < defaultTimeBlock.length; i++) {
            if (defaultTimeBlock[i].hour.localeCompare(hour) === 0) {
                hourIndex = i;
                break;
            }       
        }
        if (hourIndex === -1) throw new Error('UNAUTHORIZED');

        minuteIndex = parseInt(minute) / 10;
        if (minuteIndex < 0 || minuteIndex > 5) throw new Error('UNAUTHORIZED');

        const updatedTime = await TimeService.updateTimeColor(time, hourIndex, minuteIndex, color);
        if (!updatedTime) throw new Error('INTERNAL SERVER ERROR');
        else res.json(updatedTime);
    } catch(err) {
        next(err);
    }
}