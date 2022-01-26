import { Request, Response, NextFunction } from "express";
import User from "../entities/users";
import { RequestCustom } from "../types/Request";

import * as UserService from "../services/userService";
import * as DayService from "../services/dayService";
import * as TimeService from "../services/timeService";
import * as TaskService from "../services/taskService";

import Time from "../entities/time";
import Day from "../entities/days";
import Task from "../entities/tasks";
import Title from "../types/Title";

export const createPlanner = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        let user: User | undefined;
        if (userId) user = await UserService.findUserById(userId);
        if (!user) throw new Error('UNAUTHORIZED');
        
        const { date, comment, targetTimeH, targetTimeM, tasks } = req.body;
        const day: Day = await DayService.insertDay(user.id, targetTimeH, targetTimeM, date, comment);
        const time: Time = await TimeService.insertTime(day.id);

        const taskList: Task[] = [];
        tasks.forEach((task: any) => {
            const taskObj: Task = new Task();
            taskObj.dayId = day.id;
            taskObj.subject = task.subject;

            const titleList: Title[] = [];
            task.titles.forEach((title: string) => {
                titleList.push({
                    title,
                    isFinished: false,
                });
            });

            taskObj.titles = titleList;
            taskList.push(taskObj);
        });
        await Task.insertBulkTask(taskList);
        console.log(day.id);
        res.json(taskList);
    } catch(err) {
        next(err);
    }
}

export const getDayPlanner = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        const { dayId } = req.params;
        let user: User | undefined;
        if (userId) user = await UserService.findUserById(userId);
        if (!user) throw new Error('UNAUTHORIZED')

        const day: Day | undefined = await DayService.findDayById(parseInt(dayId));
        if (!day) throw new Error('UNAUTHORIZED');

        const time: Time | undefined = await TimeService.findTimeByDayId(day.id);
        if (!time) throw new Error('UNAUTHORIZED');

        const taskList: Task[] = await TaskService.findTaskByDayId(day.id);
        res.json({
            ...day,
            timeBlock: time,
            tasks: taskList,
        })
    } catch(err) {
        next(err);
    }
}

export const getPlanner = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId;
        let user: User | undefined;
        if (userId) user = await UserService.findUserById(userId);
        if (!user) throw new Error('UNAUTHORIZED');
        
        const day: Day[] = await DayService.findDayListByUserId(user.id);
        const planner: any[] = [];

        await Promise.all(day.map( async (day: Day) => {
            const time: Time | undefined = await TimeService.findTimeByDayId(day.id);
            if (!time) throw new Error('UNAUTHORIZED');
            const taskList: Task[] = await TaskService.findTaskByDayId(day.id);
            planner.push({
                ...day,
                timeBlock: time,
                tasks: taskList,
            });
        })); 
        res.json(planner);
    } catch(err) {
        next(err);
    }
}

export const deletePlanner = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
        const { dayId } = req.params;
        const day: Day | undefined = await DayService.findDayById(parseInt(dayId));
        if (!day) throw new Error('Invalid Day');
        const time: Time | undefined = await TimeService.findTimeByDayId(parseInt(dayId));
        if (!time) throw new Error('Invalid Time');
        const tasks: Task[] = await TaskService.findTaskByDayId(parseInt(dayId));
        await time?.remove();
        console.log(time);
        await Promise.all(tasks.map(async (task: Task) => {
            try{
                console.log(task);
                await task.remove();
            } catch(err) {
                next(err);
            }
        }))
        await day.remove();
        return res.json(true);
    } catch (err) {
        next(err);
    }

}